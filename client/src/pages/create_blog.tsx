import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootStore, IBlog, IUser } from "../utils/globalTypes"
import { ALERT } from "../redux/alert/types"
import { createBlog, updateBlog } from "../redux/homeBlogs/actions"
import { validCreateBlog, shallowEqual } from "../utils/valid"

import { NotFound } from "../components/global"
import { CardHorizontal, CreateForm } from "../components/cards"
import { ReactQuill } from "../components/editor"
import { getAPI } from "../utils/fetchData"

interface IProps {
  id?: string
}

const initialState = {
  user: "",
  title: "",
  content: "",
  description: "",
  thumbnail: "",
  category: "",
  createdAt: new Date().toISOString(),
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const { auth } = useSelector((state: RootStore) => state)

  const [blog, setBlog] = useState<IBlog>(initialState)
  const [body, setBody] = useState("")
  const [text, setText] = useState("")
  const [oldData, setOldData] = useState<IBlog>(initialState)

  useEffect(() => {
    if (!id) {
      return
    }

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data)
        setBody(res.data.content)
        setOldData(initialState)
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {
      setBlog(initialState)
      setBody("")
      setOldData(initialState)
    }
  }, [id])

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

    if (id) {
      if ((blog.user as IUser)._id !== auth.user?._id) {
        return dispatch({
          type: ALERT,
          payload: { errors: "無効な認証です。" },
        })
      }

      const result = shallowEqual(oldData, newData)
      if (result) {
        return dispatch({
          type: ALERT,
          payload: { errors: "データは更新されません。" },
        })
      }

      dispatch(updateBlog(newData, auth.access_token))
    } else {
      dispatch(createBlog(newData, auth.access_token))
    }

    setBlog(initialState)
    setBody("")
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
      <ReactQuill setBody={setBody} body={body} />
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
        {id ? "アップデート" : "登録する"}
      </button>
    </div>
  )
}

export default CreateBlog
