import * as commentTypes from "./types"
import initialState from "../store/initialState"

const commentReducer = (
  state: commentTypes.ICommentState = initialState.comments,
  action: commentTypes.ICommentType,
): commentTypes.ICommentState => {
  switch (action.type) {
    case commentTypes.CREATE_COMMENT:
      return {
        ...state,
        data: [action.payload, ...state.data],
      }
    default:
      return state
  }
}

export default commentReducer
