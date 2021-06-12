import { User } from '../../utils/globalTypes';

export const AUTH = 'AUTH'

export interface Auth {
  token?: string
  user?: User
}

export interface AuthType {
  type: typeof AUTH
  payload: Auth
}