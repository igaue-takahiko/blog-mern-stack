import { IUser } from '../../utils/globalTypes';

export const AUTH = 'AUTH'

export interface IAuth {
  msg?: string
  token?: string
  user?: IUser
}

export interface IAuthType {
  type: typeof AUTH
  payload: IAuth
}