import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

import { getBlogsByUserId } from "../../redux/blogsUser/actions"
import { IParams, RootStore, IBlog } from "../../utils/globalTypes"

import { SpinnerLoading, Pagination } from "../global"
import { CardHorizontal } from "../cards"

const UserBlogs: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user_id = useParams<IParams>().slug
  const { blogsUser } = useSelector((state: RootStore) => state)
  const { search } = history.location

  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!user_id) {
      return
    }

    if (blogsUser.every((item) => item.id !== user_id)) {
      dispatch(getBlogsByUserId(user_id, search))
    } else {
      const data = blogsUser.find((item) => item.id === user_id)
      if (!data) {
        return
      }

      setBlogs(data.blogs)
      setTotal(data.total)
      if (data.search) {
        history.push(data.search)
      }
    }
  }, [blogsUser, dispatch, history, search, user_id])

  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByUserId(user_id, search))
  }

  if (!blogs) {
    return <SpinnerLoading />
  }

  if (blogs.length === 0) {
    return <h3 className="text-center">投稿がありません</h3>
  }

  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHorizontal key={blog._id} blog={blog} />
        ))}
      </div>
      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  )
}

export default UserBlogs
