import { AUTH, Auth, AuthType } from "./types";

const authReducer = (state: Auth = {}, action: AuthType): Auth => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
