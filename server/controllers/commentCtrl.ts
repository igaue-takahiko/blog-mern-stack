import mongoose from "mongoose"
import { Request, Response } from "express"
import Comments from "../models/commentModel"
import { IReqAuth } from "../config/interface"
import { io } from "../index"

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1
  let limit = Number(req.query.limit) * 1 || 4
  let skip = (page - 1) * limit

  return { page, limit, skip }
}

const commentCtrl = {
  createComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const { content, blog_id, blog_user_id } = req.body

      const newComment = new Comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
      })

      const data = {
        ...newComment._doc,
        user: req.user,
        createdAt: new Date().toISOString(),
      }

      io.to(`${blog_id}`).emit("createComment", data)

      await newComment.save()

      return res.json({ newComment, msg: "コメントが無事、投稿完了しました。" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getComments: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req)

    try {
      const data = await Comments.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $unwind: "$user" },
              {
                $lookup: {
                  from: "comments",
                  let: { cm_id: "$replyCM" },
                  pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                    {
                      $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                      },
                    },
                    { $unwind: "$user" },
                    {
                      $lookup: {
                        from: "users",
                        localField: "reply_user",
                        foreignField: "_id",
                        as: "reply_user",
                      },
                    },
                    { $unwind: "$reply_user" },
                  ],
                  as: "replyCM",
                },
              },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ])

      const comments = data[0].totalData
      const count = data[0].count

      let total = 0

      if (count % limit === 0) {
        total = count / limit
      } else {
        total = Math.floor(count / limit) + 1
      }

      return res.json({ comments, total })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  replyComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const { content, blog_id, blog_user_id, comment_root, reply_user } =
        req.body

      const newComment = new Comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
        comment_root,
        reply_user: reply_user._id,
      })

      await Comments.findOneAndUpdate(
        { _id: comment_root },
        { $push: { replyCM: newComment._id } },
      )

      const data = {
        ...newComment._doc,
        user: req.user,
        reply_user,
        createdAt: new Date().toISOString(),
      }

      io.to(`${blog_id}`).emit("replyComment", data)

      await newComment.save()

      return res.json(newComment)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const { data } = req.body

      const comment = await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        { content: data.content },
      )

      if (!comment) {
        return res.status(400).json({ msg: "コメントが表示されません。" })
      }

      io.to(`${data.blog_id}`).emit("updateComment", data)

      return res.json({ msg: "アップデートが完了しました。" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { blog_user_id: req.user._id }],
      })

      if (!comment) {
        return res.status(400).json({ msg: "コメントがありません。" })
      }

      if (comment.comment_root) {
        // update replyCM
        await Comments.findOneAndUpdate(
          { _id: comment.comment_root },
          {
            $pull: { replyCM: comment._id },
          },
        )
      } else {
        // delete all comments in replyCM
        await Comments.deleteMany({ _id: { $in: comment.replyCM } })
      }

      io.to(`${comment.blog_id}`).emit("deleteComment", comment)

      return res.json({ msg: "削除が完了しました。" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default commentCtrl
