import React from "react"
import { useDispatch } from "react-redux"
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite"
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite"

import { googleLogin, facebookLogin } from "../../redux/auth/action"

const SocialLogin: React.FC = () => {
  const dispatch = useDispatch()

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
  }

  const onFacebookSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse
    dispatch(facebookLogin(accessToken, userID))
  }

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          cookiepolicy="single_host_origin"
          onSuccess={onSuccess}
        />
      </div>
      <div className="my-2">
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onSuccess={onFacebookSuccess}
        />
      </div>
    </>
  )
}

export default SocialLogin
