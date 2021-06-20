import { Dispatch } from 'redux';
import { AUTH, IAuthType } from './types';
import { ALERT, IAlertType } from '../alert/types';
import { postAPI } from '../../utils/fetchData';
import { IUserLogin, IUserRegister } from '../../utils/globalTypes';
import { validRegister } from '../../utils/valid';

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await postAPI('login', userLogin)

    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })

    dispatch({ type: ALERT, payload: { success: "ログイン出来ました！" } })
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