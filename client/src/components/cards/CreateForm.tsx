import React from "react"
import { useSelector } from "react-redux"

import { RootStore, IBlog, InputChange } from "../../utils/globalTypes"

interface IProps {
  blog: IBlog
  setBlog: (blog: IBlog) => void
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { categories } = useSelector((state: RootStore) => state)

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setBlog({ ...blog, [name]: value })
  }

  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      const file = files[0]
      setBlog({ ...blog, thumbnail: file })
    }
  }

  return (
    <form>
      <div className="position-relative form-floating">
        <input
          type="text"
          className="form-control"
          id="title"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
        />
        <label htmlFor="title">タイトル</label>
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "4px", opacity: 0.3 }}
        >
          {blog.title.length} / 50
        </small>
      </div>
      <div className="my-3 input-group">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>
      <div className="position-relative">
        <div className="form-floating">
          <textarea
            className="form-control"
            style={{ resize: "none", height: "160px" }}
            id="description"
            name="description"
            value={blog.description}
            onChange={handleChangeInput}
          />
          <label htmlFor="description">内容を記載してください</label>
        </div>
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "4px", opacity: 0.3 }}
        >
          {blog.description.length} / 200
        </small>
      </div>
      <div className="my-3 form-floating">
        <select
          className="form-select text-capitalize"
          id="category"
          name="category"
          value={blog.category}
          onChange={handleChangeInput}
        >
          <option defaultValue="">カテゴリー選択</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="category">カテゴリーを選択してください</label>
      </div>
    </form>
  )
}

export default CreateForm
