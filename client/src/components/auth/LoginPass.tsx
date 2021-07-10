import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { InputChange, FormSubmit } from "../../utils/globalTypes"
import { login } from "../../redux/auth/action"

const LoginPass: React.FC = () => {
  const dispatch = useDispatch()
  const initialState = { account: "", password: "" }

  const [userLogin, setUserLogin] = useState(initialState)
  const [typePass, setTypePass] = useState(false)

  const { account, password } = userLogin

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserLogin({ ...userLogin, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(login(userLogin))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 form-group">
        <label htmlFor="account" className="form-label">
          メールアドレス / 電話番号
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-3 form-group">
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
      <button
        type="submit"
        className="mt-1 btn btn-dark w-100"
        disabled={account && password ? false : true}
      >
        ログイン
      </button>
    </form>
  )
}

export default LoginPass
