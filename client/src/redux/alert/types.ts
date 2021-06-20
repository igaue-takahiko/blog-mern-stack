import { IAlert } from '../../utils/globalTypes'

export const ALERT = 'ALERT'

export interface IAlertType {
  type: typeof ALERT
  payload: IAlert
}