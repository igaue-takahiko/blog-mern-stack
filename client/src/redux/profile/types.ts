import { IUser } from '../../utils/globalTypes';

export const GET_OTHER_INFO = "GET_OTHER_INFO"

export interface IGetOtherInfoType {
  type: typeof GET_OTHER_INFO,
  payload: IUser
}
