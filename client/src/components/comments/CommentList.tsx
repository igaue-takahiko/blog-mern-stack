import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IComment, RootStore } from "../../utils/globalTypes"

import Input from "./Input"

import { replyComment } from '../../redux/comment/actions';

interface IProps {
  comment: IComment
  showReply: IComment[]
  setShowReply: (showReply: IComment[]) => void
}

const CommentList: React.FC<IProps> = ({
  children,
  comment,
  showReply,
  setShowReply,
}) => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const [onReply, setOnReply] = useState(false)

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) {
      return
    }

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment._id,
      createdAt: new Date().toISOString(),
    }

    setShowReply([data, ...showReply])
    dispatch(replyComment(data, auth.access_token))
    setOnReply(false)
  }

  return (
    <div className="w-100">
      <div className="comment_box">
        <div
          className="p-2"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        <div className="p-2 d-flex justify-content-between">
          <small
            style={{ cursor: "pointer" }}
            onClick={() => setOnReply(!onReply)}
          >
            {onReply ? "- キャンセル -" : "- 返信 -"}
          </small>
          <small className="m-2">
            {new Date(comment.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
      {onReply && <Input callback={handleReply} />}
      {children}
    </div>
  )
}

export default CommentList
