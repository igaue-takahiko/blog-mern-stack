import { Dispatch } from 'redux';
import { AUTH, IAuthType } from './types';
import { ALERT, IAlertType } from '../alert/types';
import { postAPI, getAPI } from '../../utils/fetchData';
import { IUserLogin, IUserRegister } from '../../utils/globalTypes';
import { validRegister } from '../../utils/valid';

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await postAPI('login', userLogin)

    dispatch({ type: AUTH, payload: res.data})

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', "t.i-blog")
  } catch (error: any) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}

export const register = (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)

  if (check.errorLength > 0) {
    return dispatch({ type: ALERT, payload: { errors: check.errorMsg } })
  }

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('register', userRegister)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (error: any) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}

export const refreshToken = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged')
  if (logged !== "t.i-blog") {
    return
  }

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await getAPI('refresh_token')

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: {} })
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}

export const logout = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    localStorage.removeItem("logged")
    await getAPI('logout')
    window.location.href = "/"
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}

export const googleLogin = (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('google_login', { id_token })

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 't.i-blog')
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}

export const facebookLogin = (accessToken: string, userID: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('facebook_login', { accessToken, userID })

    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 't.i-blog')
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
  }
}