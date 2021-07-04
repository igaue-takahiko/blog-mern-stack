import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { InputChange, FormSubmit } from "../../utils/globalTypes"
import { register } from "../../redux/auth/action"

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch()
  const initialSate = { name: "", account: "", password: "", cf_password: "" }

  const [userRegister, setUserRegister] = useState(initialSate)
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const { name, account, password, cf_password } = userRegister

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserRegister({ ...userRegister, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(register(userRegister))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          名前
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          placeholder="２０文字以内"
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          メールアドレス / 電話番号
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          placeholder="例）Example@gmail.com/+81 374481936"
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          パスワード
        </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="半角英数６文字以上"
            onChange={handleChangeInput}
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
      <div className="form-group mb-3">
        <label htmlFor="cf_password" className="form-label">
          確認用パスワード
        </label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            placeholder="確認用パスワード"
            onChange={handleChangeInput}
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
      <button
        type="submit"
        className="btn btn-dark w-100 my-1"
        disabled={account && password ? false : true}
      >
        登録
      </button>
    </form>
  )
}

export default RegisterForm
