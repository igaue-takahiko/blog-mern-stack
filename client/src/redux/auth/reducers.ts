import { AUTH, IAuth, IAuthType } from "./types"
import initialState from "../store/initialState"

const authReducer = (
  state: IAuth = initialState.auth,
  action: IAuthType,
): IAuth => {
  switch (action.type) {
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer
