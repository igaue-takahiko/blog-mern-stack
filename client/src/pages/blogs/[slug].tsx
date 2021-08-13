import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"

import { NotFound, Pagination } from "../../components/global"
import { CardVertically } from "../../components/cards"

import { RootStore, IParams, IBlog } from "../../utils/globalTypes"
import { getBlogsByCategoryId } from "../../redux/blogsCategory/actions"

const BlogsByCategory: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { search } = history.location
  const { slug } = useParams<IParams>()
  const { categories, blogsCategory } = useSelector((state: RootStore) => state)

  const [categoryId, setCategoryId] = useState("")
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const category = categories.find((item) => item.name === slug)
    if (category) {
      setCategoryId(category._id)
    }
  }, [categories, slug])

  useEffect(() => {
    if (!categoryId) {
      return
    }

    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search))
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId)
      if (!data) {
        return
      }

      setBlogs(data.blogs)
      setTotal(data.total)
    }
  }, [blogsCategory, categoryId, dispatch, search])

  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }

  if (!blogs) {
    return <NotFound />
  }

  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVertically key={blog._id} blog={blog} />
        ))}
      </div>
      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  )
}

export default BlogsByCategory
