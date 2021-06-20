import { AUTH, Auth, AuthType } from "./types";
import initialState from '../store/initialState';

const authReducer = (state: Auth = initialState.auth, action: AuthType): Auth => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
