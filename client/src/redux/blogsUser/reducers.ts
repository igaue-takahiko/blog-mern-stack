import * as blogsTypes from "./types"
import initialState from "../store/initialState"
import { IUser } from "./../../utils/globalTypes"

const blogsUserReducer = (
  state: blogsTypes.IBlogsUser[] = initialState.blogsUser,
  action: blogsTypes.IBlogUserType,
): blogsTypes.IBlogsUser[] => {
  switch (action.type) {
    case blogsTypes.GET_BLOGS_USER_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload]
      } else {
        return state.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        )
      }
    case blogsTypes.CREATE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: [action.payload, ...item.blogs],
            }
          : item,
      )
    case blogsTypes.DELETE_BLOGS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: item.blogs.filter(
                (blog) => blog._id !== action.payload._id,
              ),
            }
          : item,
      )
    default:
      return state
  }
}

export default blogsUserReducer
