import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootStore } from "../utils/globalTypes"

import { CardVertically } from "../components/cards"
import { SpinnerLoading } from "../components/global"

const Home: React.FC = () => {
  const { blogs } = useSelector((state: RootStore) => state)

  if (blogs.length === 0) {
    return <SpinnerLoading />
  }

  return (
    <div className="home_page">
      {blogs.map((blog) => (
        <div key={blog._id}>
          {blog.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${blog.name.toLowerCase()}`}>
                  {blog.name} <small>( {blog.count} 投稿数)</small>
                </Link>
              </h3>
              <hr className="mt-1" />
              <div className="home_blogs">
                {blog.blogs.map((blog) => (
                  <CardVertically key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}
          {blog.count > 4 && (
            <Link
              className="text-end d-block mt-2 mb-3"
              to={`/blogs/${blog.name}`}
            >
              続きを読む &gt;&gt;
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default Home
