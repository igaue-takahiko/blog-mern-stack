import * as profileTypes from "./types"
import initialState from "../store/initialState"
import { IUser } from "../../utils/globalTypes"

const profileReducer = (
  state: IUser[] = initialState.profile,
  action: profileTypes.IGetOtherInfoType,
) => {
  switch (action.type) {
    case profileTypes.GET_OTHER_INFO:
      return [...state, action.payload]
    default:
      return state
  }
}

export default profileReducer
