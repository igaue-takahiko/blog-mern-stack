import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootStore, IBlog } from "../utils/globalTypes"

import { NotFound } from "../components/global"
import { CardHorizontal, CreateForm } from "../components/cards"
import { ReactQuill } from "../components/editor"

const initialState = {
  user: "",
  title: "",
  content: "",
  description: "",
  thumbnail: "",
  category: "",
  createdAt: new Date().toISOString(),
}

const CreateBlog: React.FC = () => {
  const dispatch = useDispatch()
  const { auth, categories } = useSelector((state: RootStore) => state)

  const [blog, setBlog] = useState<IBlog>(initialState)
  const [body, setBody] = useState("")

  if (!auth.access_token) {
    return <NotFound />
  }

  return (
    <div className="my-4 create_blog">
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>新規作成</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="col-md-6">
          <h5>プレビュー</h5>
          <CardHorizontal blog={blog} />
        </div>
      </div>
      <ReactQuill setBody={setBody} />
      <button className="btn btn-dark mt-3 d-block mx-auto">登録する</button>
    </div>
  )
}

export default CreateBlog
