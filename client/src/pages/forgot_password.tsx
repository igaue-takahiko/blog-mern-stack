import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { forgotPassword } from "../redux/auth/action"

import { FormSubmit } from "../utils/globalTypes"

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch()

  const [account, setAccount] = useState("")

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(forgotPassword(account))
  }

  return (
    <div className="my-4 auth_page mx-auto" style={{ maxWidth: "600px" }}>
      <div className='auth_box'>
      <h3>パスワードをお忘れですか？</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="account">メールアドレス / 電話番号</label>
        <div className='d-flex align-items-center'>
          <input
            type="text"
            className="form-control col"
            id="account"
            name="account"
            onChange={(e) => setAccount(e.target.value)}
          />
          <button
            className="btn btn-primary mx-2 d-flex align-items-center"
            type="submit"
          >
            <i className="fas fa-paper-plane me-2"></i> 送信
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default ForgotPassword
