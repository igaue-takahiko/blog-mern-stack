import React, { useState } from "react";
import { Link } from "react-router-dom";

import { LoginPass, LoginSMS } from "../components/auth";

const Login: React.FC = () => {
  const [sms, setSms] = useState(false);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        {sms ? <LoginPass /> : <LoginSMS />}
        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-md-6">
            <Link to="/forget_password" className="col-6">
              パスワードを忘れた方はこちら
            </Link>
          </span>
          <span className="col-md-6 text-md-end" onClick={() => setSms(!sms)}>
            {sms ? "パスワードでログインする" : "SMSでログインする"}
          </span>
        </small>
        <p>
          アカウントがお持ちでない方は
          <Link to="/register" style={{ color: "crimson" }}>
            {"こちら"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
