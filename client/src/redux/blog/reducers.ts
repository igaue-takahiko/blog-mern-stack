import initialState from "../store/initialState"
import * as blogsTypes from "./types"

const blogsReducer = (
  state: blogsTypes.IHomeBlogs[] = initialState.blogs,
  action: blogsTypes.IGetHomeBlogsType,
): blogsTypes.IHomeBlogs[] => {
  switch (action.type) {
    case blogsTypes.GET_HOME_BLOGS:
      return action.payload
    default:
      return state
  }
}

export default blogsReducer
