import { Dispatch } from 'redux';
import { AUTH, AuthType } from './types';
import { ALERT, IAlertType } from '../alert/types';
import { postAPI } from '../../utils/fetchData';
import { IUserLogin } from '../../utils/globalTypes';

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<AuthType | IAlertType>) => {
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