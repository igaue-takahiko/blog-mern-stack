import { IUser } from '../../utils/globalTypes';

export const AUTH = 'AUTH'

export interface Auth {
  token?: string
  user?: IUser
}

export interface AuthType {
  type: typeof AUTH
  payload: Auth
}