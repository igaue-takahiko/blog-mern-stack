import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { FormSubmit } from "../../utils/globalTypes"
import { loginSMS } from "../../redux/auth/action"

const LoginSMS: React.FC = () => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(loginSMS(phone))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          電話番号
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          placeholder="例）+81 90243456778"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100"
        disabled={phone ? false : true}
      >
        ログイン
      </button>
    </form>
  )
}

export default LoginSMS
