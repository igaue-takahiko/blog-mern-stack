import { IAlert } from '../../utils/globalTypes';
import { ALERT, IAlertType } from './types';
import initialState from '../store/initialState';

const alertReducer = (state: IAlert = initialState.alert, action: IAlertType): IAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer
