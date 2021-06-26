import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';

import { googleLogin } from "../../redux/auth/action";



const SocialLogin: React.FC = () => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  };

  return (
    <div className="my-2">
      <GoogleLogin
        client_id="739953059304-fs5okfl1p5vvupft60nerh2ctbktiaes.apps.googleusercontent.com"
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default SocialLogin;
