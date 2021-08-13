import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootStore } from "../utils/globalTypes"

import { CardVertically } from "../components/cards"
import { SpinnerLoading } from "../components/global"

const Home: React.FC = () => {
  const { homeBlogs } = useSelector((state: RootStore) => state)

  if (homeBlogs.length === 0) {
    return <SpinnerLoading />
  }

  return (
    <div className="home_page">
      {homeBlogs.map((homeBlog) => (
        <div key={homeBlog._id}>
          {homeBlog.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                  {homeBlog.name} <small>( {homeBlog.count} 投稿数)</small>
                </Link>
              </h3>
              <hr className="mt-1" />
              <div className="home_blogs">
                {homeBlog.blogs.map((blog) => (
                  <CardVertically key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}
          {homeBlog.count > 4 && (
            <Link
              className="text-end d-block mt-2 mb-3"
              to={`/blogs/${homeBlog.name}`}
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
