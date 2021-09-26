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
    case commentTypes.GET_COMMENTS:
      return action.payload
    case commentTypes.REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: [...(item.replyCM as []), action.payload],
              }
            : item,
        ),
      }
    default:
      return state
  }
}

export default commentReducer
