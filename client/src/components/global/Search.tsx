import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { getAPI } from "../../utils/fetchData"
import { IBlog } from "../../utils/globalTypes"

import { CardHorizontal } from "../cards"

const Search: React.FC = () => {
  const { pathname } = useLocation()

  const [search, setSearch] = useState("")
  const [blogs, setBlogs] = useState<IBlog[]>([])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) {
        return setBlogs([])
      }

      try {
        const res = await getAPI(`search/blogs?title=${search}`)

        setBlogs(res.data)
      } catch (error: any) {
        console.log(error.response.data.msg)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [search])

  useEffect(() => {
    setSearch("")
    setBlogs([])
  }, [pathname])

  return (
    <div className="search position-relative me-4" style={{ width: "70%" }}>
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="検索"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length >= 2 && (
        <div
          className="position-absolute pt-2 px-1 w-100 rounded"
          style={{
            background: "#eee",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            overflow: "auto",
          }}
        >
          {blogs.length ? (
            blogs.map((blog) => <CardHorizontal key={blog._id} blog={blog} />)
          ) : (
            <h3 className="text-center">投稿がありません。</h3>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
