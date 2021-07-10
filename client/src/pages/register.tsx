import React from "react";
import { Link } from "react-router-dom";

import { RegisterForm } from "../components/auth";

const Register: React.FC = () => {
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="mb-4 text-center text-uppercase">Register</h3>
        <RegisterForm />
        <p className="mt-2">
          {"アカウントをお持ちの方は"}
          <Link to="/login" style={{ color: "crimson" }}>
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
