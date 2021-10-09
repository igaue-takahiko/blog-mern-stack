import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { IBlog, IParams, RootStore } from "../../utils/globalTypes"
import { ALERT } from "../../redux/alert/types"
import { deleteBlog } from "../../redux/blogsUser/actions"

interface IProps {
  blog: IBlog
}

const CardHorizontal: React.FC<IProps> = ({ blog }) => {
  const dispatch = useDispatch()
  const { slug } = useParams<IParams>()
  const { auth } = useSelector((state: RootStore) => state)

  const handleDelete = () => {
    if (!auth.user || !auth.access_token) {
      return
    }

    if (slug !== auth.user._id) {
      return dispatch({ type: ALERT, payload: { errors: "無効な認証です。" } })
    }

    if (window.confirm("この投稿を削除しますか？")) {
      dispatch(deleteBlog(blog, auth.access_token))
    }
  }

  return (
    <div className="card mb-3" style={{ minWidth: "280px" }}>
      <div className="row g-0 p-2">
        <div
          className="col-md-4"
          style={{ minHeight: "152px", maxWidth: "168px", overflow: "hidden" }}
        >
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === "string" ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    alt="thumbnail"
                    className="w-100 h-100 img-thumbnail rounded"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  alt="thumbnail"
                  className="w-100 h-100 img-thumbnail rounded"
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          )}
        </div>
        <div className="col-md-8 position-relative">
          <div className="card-body">
            <h5 className="card-title">
              <Link
                className="text-capitalize text-decoration-none"
                to={`/blog/${blog._id}`}
              >
                {blog.title}
              </Link>
            </h5>
            <p className="card-text">{blog.description}</p>
            {blog.title && (
              <div className="card-text d-flex justify-content-between align-items-center">
                {slug === auth.user?._id && (
                  <div style={{ cursor: "pointer" }}>
                    <Link to={`/update_blog/${blog._id}`}>
                      <i className="fas fa-edit" title="edit" />
                    </Link>
                    <i
                      className="fas fa-trash text-danger mx-3"
                      title="edit"
                      onClick={handleDelete}
                    />
                  </div>
                )}
                <small className="text-muted">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHorizontal
