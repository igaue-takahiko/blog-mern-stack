import { SOCKET, ISocketType } from "./types"
import initialState from "../store/initialState"

const socketReducer = (
  state: any = initialState.socket,
  action: ISocketType,
): any => {
  switch (action.type) {
    case SOCKET:
      return action.payload
    default:
      return state
  }
}

export default socketReducer
