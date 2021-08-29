import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { IBlog, RootStore, IUser, IComment } from "../../utils/globalTypes"

import { Input, Comments } from "../comments"

import { createComment } from '../../redux/comment/actions';

interface IProps {
  blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const dispatch = useDispatch()
  const { auth, comments } = useSelector((state: RootStore) => state)

  const [showComments, setShowComments] = useState<IComment[]>([])

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) {
      return
    }

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    }

    setShowComments([data, ...showComments])
    dispatch(createComment(data, auth.access_token))
  }

  useEffect(() => {
    if (comments.data.length === 0) {
      return
    }

    setShowComments(comments.data)
  },[comments.data])

  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>
      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `投稿者: ${blog.user.name}`}
        </small>
        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      <hr className="my-1" />
      <h3 style={{ color: "#ff7a00" }}>✩ コメント ✩</h3>
      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          コメントを書くには<Link to={`/login?blog/${blog._id}`}>ログイン</Link>
          してください
        </h5>
      )}
      {showComments?.map((comment, index) => (
        <Comments key={index} comment={comment} />
      ))}
    </div>
  )
}

export default DisplayBlog
