import React from "react"
import { IComment } from "../../utils/globalTypes"

interface IProps {
  comment: IComment
}

const CommentList: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="w-100">
      <div className="comment_box">
        <div
          className="p-2"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        <div className="d-flex justify-content-between p-2">
          <small style={{ cursor: "pointer" }}>- 返信 -</small>
        </div>
        <small className="m-2">
          {new Date(comment.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  )
}

export default CommentList
