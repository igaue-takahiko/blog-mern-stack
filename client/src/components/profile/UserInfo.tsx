import React, { useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
} from "../../utils/globalTypes"
import { uploadUser, resetPassword } from "../../redux/profile/actions"
import { NotFound } from "../global"

const UserInfo: React.FC = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const initialState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
  }

  const [user, setUser] = useState<IUserProfile>(initialState)
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const { name, avatar, password, cf_password } = user

  const handleChangeInput = useCallback(
    (e: InputChange) => {
      const { name, value } = e.target
      setUser({ ...user, [name]: value })
    },
    [user],
  )

  const handleChangeFile = useCallback(
    (e: InputChange) => {
      const target = e.target as HTMLInputElement
      const files = target.files

      if (files) {
        const file = files[0]
        setUser({ ...user, avatar: file })
      }
    },
    [user],
  )

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (avatar || name) {
      dispatch(uploadUser(avatar as File, name, auth))
    }

    if (password && auth.access_token) {
      dispatch(resetPassword(password, cf_password, auth.access_token))
    }
  }

  if (!auth.user) {
    return <NotFound />
  }

  return (
    <form className="profile_info" onSubmit={handleSubmit}>
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}
          alt="avatar"
        />
        <span>
          <i className="fas fa-camera"></i>
          <p>Change</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={handleChangeFile}
          />
        </span>
      </div>
      <div className="my-3 form-group">
        <label htmlFor="name">名前</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className="my-3 form-group">
        <label htmlFor="account">アカウント</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>
      {auth.user.type !== 'register' && (
        <span className="text-danger">
          * {auth.user.type}のクイックログインアカウントはこの機能を使用できません *
        </span>
      )}
      <div className="my-3 form-group">
        <label htmlFor="password">パスワード</label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            disabled={auth.user.type !== 'register'}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </small>
        </div>
      </div>
      <div className="my-3 form-group">
        <label htmlFor="cf_password">確認用パスワード</label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            disabled={auth.user.type !== 'register'}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </small>
        </div>
      </div>
      <button className="btn btn-dark w-100" type="submit">
        アップロードする
      </button>
    </form>
  )
}

export default UserInfo
