import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"

import { LoginPass, LoginSMS, SocialLogin } from "../components/auth"
import { RootStore } from "../utils/globalTypes"

const Login: React.FC = () => {
  const history = useHistory()
  const { auth } = useSelector((state: RootStore) => state)

  const [sms, setSms] = useState(false)

  useEffect(() => {
    if (auth.access_token) {
      let url = history.location.search.replace("?", "/")
      history.push(url)
    }
  }, [auth.access_token, history])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="mb-4 text-center text-uppercase">Login</h3>
        <SocialLogin />
        {sms ? <LoginSMS /> : <LoginPass />}
        <small className="my-2 row text-primary" style={{ cursor: "pointer" }}>
          <span className="col-md-6">
            <Link to="/forgot_password" className="col-6">
              パスワードを忘れた方はこちら
            </Link>
          </span>
          <span className="col-md-6 text-md-end" onClick={() => setSms(!sms)}>
            {sms ? "パスワードでログインする" : "SMSでログインする"}
          </span>
        </small>
        <p>
          アカウントがお持ちでない方は
          <Link
            to={`/register${history.location.search}`}
            style={{ color: "crimson" }}
          >
            {"こちら"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
