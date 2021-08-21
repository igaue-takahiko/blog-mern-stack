import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { IParams, IBlog } from "../../utils/globalTypes"
import { getAPI } from "../../utils/fetchData"

import { SpinnerLoading } from "../../components/global"
import { DisplayBlog } from "../../components/blog"
import { showErrorMessage } from "../../components/alert/Alert"

const DetailBlog: React.FC = () => {
  const id = useParams<IParams>().slug

  const [blog, setBlog] = useState<IBlog>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      return
    }

    setLoading(true)

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.response.data.msg)
        setLoading(false)
      })

    return () => setBlog(undefined)
  }, [id])

  if (loading) {
    return <SpinnerLoading />
  }

  return (
    <div className="my-4">
      {error && showErrorMessage(error)}
      {blog && <DisplayBlog blog={blog} />}
      <h2>コメント欄</h2>
    </div>
  )
}

export default DetailBlog
