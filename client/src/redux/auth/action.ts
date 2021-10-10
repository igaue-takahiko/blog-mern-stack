import { Dispatch } from "redux"
import { AUTH, IAuthType } from "./types"
import { ALERT, IAlertType } from "../alert/types"
import { postAPI, getAPI } from "../../utils/fetchData"
import { IUserLogin, IUserRegister } from "../../utils/globalTypes"
import { validRegister, validPhone } from "../../utils/valid"
import { checkTokenExp } from "../../utils/checkTokenExp"

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI("login", userLogin)

      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
      localStorage.setItem("logged", "t.i-blog")
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)

    if (check.errorLength > 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errorMsg } })
    }

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI("register", userRegister)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged")
    if (logged !== "t.i-blog") {
      return
    }

    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getAPI("refresh_token")

      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: {} })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const logout =
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      const res = await getAPI("logout", access_token)

      localStorage.removeItem("logged")

      dispatch({ type: AUTH, payload: {} })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const googleLogin =
  (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI("google_login", { id_token })

      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
      localStorage.setItem("logged", "t.i-blog")
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const facebookLogin =
  (accessToken: string, userID: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI("facebook_login", { accessToken, userID })

      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
      localStorage.setItem("logged", "t.i-blog")
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const loginSMS =
  (phone: string) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const check = validPhone(phone)
    if (!check) {
      return dispatch({
        type: ALERT,
        payload: { errors: "電話番号の形式が正しくありません。" },
      })
    }

    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI("login_sms", { phone })

      if (!res.data.valid) {
        verifySMS(phone, dispatch)
      }
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const verifySMS = async (
  phone: string,
  dispatch: Dispatch<IAuthType | IAlertType>,
) => {
  const code = prompt("認証コードを入力してください。")
  if (!code) {
    return
  }

  try {
    const res = await postAPI("sms_verify", { phone, code })

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem("logged", "t.i-blog")
  } catch (error: any) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    setTimeout(() => {
      verifySMS(phone, dispatch)
    }, 100)
  }
}

export const forgotPassword =
  (account: string) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI("forgot_password", { account })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
