import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootStore, IBlog } from "../utils/globalTypes"
import { ALERT } from "../redux/alert/types"
import { createBlog } from "../redux/homeBlogs/actions"
import { validCreateBlog } from "../utils/valid"

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
  const divRef = useRef<HTMLDivElement>(null)
  const { auth } = useSelector((state: RootStore) => state)

  const [blog, setBlog] = useState<IBlog>(initialState)
  const [body, setBody] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    const div = divRef.current
    if (!div) {
      return
    }

    const text = div?.innerText as string
    setText(text)
  }, [body])

  const handleSubmit = async () => {
    if (!auth.access_token) {
      return
    }

    const check = validCreateBlog({ ...blog, content: text })
    if (check.errorLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errorMsg } })
    }

    let newData = { ...blog, content: body }

    dispatch(createBlog(newData, auth.access_token))
  }

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
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <p className="text-end">{text.length}</p>
      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        登録する
      </button>
    </div>
  )
}

export default CreateBlog
