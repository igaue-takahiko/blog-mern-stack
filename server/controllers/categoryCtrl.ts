import { Request, Response } from "express"
import Categories from "../models/categoryModel"
import Blogs from "../models/blogModel"
import { IReqAuth } from "../config/interface"

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    if (req.user.role !== "admin") {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const name = req.body.name.toLowerCase()

      const newCategory = new Categories({ name })
      await newCategory.save()

      res.json({ newCategory })
    } catch (error: any) {
      let errorMessage

      if (error.code === 11000) {
        errorMessage =
          Object.values(error.keyValue)[0] + "はもう登録してあります。"
      } else {
        let name = Object.keys(error.errors)[0]
        errorMessage = error.errors[`${name}`].message
      }

      return res.status(500).json({ msg: errorMessage })
    }
  },
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Categories.find().sort("-createdAt")
      res.json({ categories })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    if (req.user.role !== "admin") {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      await Categories.findOneAndUpdate(
        { _id: req.params.id },
        { name: req.body.name.toLowerCase() },
      )

      res.json({ msg: "アップデートが完了しました" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    if (req.user.role !== "admin") {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const blog = await Blogs.findOne({ category: req.params.id })
      if (blog) {
        return res
          .status(400)
          .json({ msg: "削除できません！このカテゴリには投稿した記事もあります。" })
      }

      const category = await Categories.findByIdAndDelete(req.params.id)
      if (!category) {
        return res.status(400).json({ msg: "カテゴリは存在しません。" })
      }

      res.json({ msg: "削除が完了しました。" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default categoryCtrl
