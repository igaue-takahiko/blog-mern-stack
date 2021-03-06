import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { IBlog, RootStore, IUser, IComment } from "../../utils/globalTypes"

import { Input, Comments } from "../comments"
import { SpinnerLoading, Pagination } from "../global"

import { createComment, getComments } from "../../redux/comment/actions"

interface IProps {
  blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth, comments } = useSelector((state: RootStore) => state)

  const [showComments, setShowComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(false)

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) {
      return
    }

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      createdAt: new Date().toISOString(),
    }

    setShowComments([data, ...showComments])
    dispatch(createComment(data, auth.access_token))
  }

  useEffect(() => {
    setShowComments(comments.data)
  }, [comments.data])

  const fetchComments = useCallback(
    (id: string, num = 1) => {
      setLoading(true)
      dispatch(getComments(id, num))
      setLoading(false)
    },
    [dispatch],
  )

  useEffect(() => {
    if (!blog._id) {
      return
    }

    const num = history.location.search.slice(6) || 1

    fetchComments(blog._id, num)
  }, [blog._id, fetchComments, history.location.search])

  const handlePagination = (num: number) => {
    if (!blog._id) {
      return
    }

    fetchComments(blog._id, num)
  }

  return (
    <div>
      <h2
        className="my-3 text-center text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>
      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `?????????: ${blog.user.name}`}
        </small>
        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      <hr className="my-1" />
      <h3 style={{ color: "#ff7a00" }}>??? ???????????? ???</h3>
      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          ???????????????????????????
          <Link to={`/login?blog/${blog._id}`}>????????????</Link>
          ??????????????????
        </h5>
      )}

      {loading ? (
        <SpinnerLoading />
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      )}

      {comments.total > 1 && (
        <Pagination total={comments.total} callback={handlePagination} />
      )}
    </div>
  )
}

export default DisplayBlog
