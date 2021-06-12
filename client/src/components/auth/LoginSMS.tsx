import React, { useState } from "react";

const LoginSMS: React.FC = () => {
  const [phone, setPhone] = useState("");

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">
          電話番号
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
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
  );
};

export default LoginSMS;
