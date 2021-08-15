import * as blogsTypes from "./types"
import initialState from "../store/initialState"

const blogsUserReducer = (
  state: blogsTypes.IBlogsUser[] = initialState.blogsUser,
  action: blogsTypes.IGetBlogsUserType,
) => {
  switch (action.type) {
    case blogsTypes.GET_BLOGS_USER_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload]
      } else {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog,
        )
      }
    default:
      return state
  }
}

export default blogsUserReducer
