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
                replyCM: [action.payload, ...item.replyCM],
              }
            : item,
        ),
      }
    case commentTypes.UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        ),
      }
    case commentTypes.UPDATE_REPLY:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.map((rp) =>
                  rp._id === action.payload._id ? action.payload : rp,
                ),
              }
            : item,
        ),
      }
    case commentTypes.DELETE_COMMENT:
      return {
        ...state,
        data: state.data.filter((item) => item._id === action.payload._id),
      }
    case commentTypes.DELETE_REPLY:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.filter(
                  (rp) => rp._id !== action.payload._id,
                ),
              }
            : item,
        ),
      }
    default:
      return state
  }
}

export default commentReducer
