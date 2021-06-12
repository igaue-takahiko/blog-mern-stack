import { Dispatch } from 'redux';
import { AUTH, AuthType } from './types';
import { postAPI } from '../../utils/fetchData';
import { UserLogin } from '../../utils/globalTypes';

export const login = (userLogin: UserLogin) => async (dispatch: Dispatch<AuthType>) => {
  try {
    const res = await postAPI('login', userLogin)

    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })
  } catch (error: any) {
    console.log(error.response.data.msg);
  }
}