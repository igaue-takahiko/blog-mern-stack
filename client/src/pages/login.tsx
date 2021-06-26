import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { LoginPass, LoginSMS, SocialLogin } from "../components/auth";
import { RootStore } from "../utils/globalTypes";

const Login: React.FC = () => {
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);

  const [sms, setSms] = useState(false);

  useEffect(() => {
    if (auth.access_token) {
      history.push("/");
    }
  }, [auth.access_token, history]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        <SocialLogin />
        {sms ? <LoginSMS /> : <LoginPass />}
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
