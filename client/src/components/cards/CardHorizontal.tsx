import React from "react"
import { Link } from "react-router-dom"

import { IBlog } from "../../utils/globalTypes"

interface IProps {
  blog: IBlog
}

const CardHorizontal: React.FC<IProps> = ({ blog }) => {
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
          </div>
          <p className="card-text position-absolute end-0 bottom-0">
            <small className="text-muted">
              {new Date(blog.createdAt).toLocaleDateString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardHorizontal
