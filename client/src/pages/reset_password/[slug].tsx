import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"

import { IParams, FormSubmit } from "../../utils/globalTypes"
import { resetPassword } from '../../redux/profile/actions';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const token = useParams<IParams>().slug

  const [password, setPassword] = useState("")
  const [cf_password, setCfPassword] = useState("")
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(resetPassword(password, cf_password, token))
  }

  return (
    <div className="auth_page">
      <form className="auth_box" onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">パスワード再設定</h3>
        <div className="my-2">
          <label htmlFor="password">パスワード</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="my-2">
          <label htmlFor="cf_password">確認用パスワード</label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              value={cf_password}
              onChange={(e) => setCfPassword(e.target.value)}
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
        <button type="submit" className="btn btn-dark w-100 mt-2">
          登録
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
