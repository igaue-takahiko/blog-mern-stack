import * as blogsCategoryTypes from "./types"
import initialState from "../store/initialState"

const blogsCategoryReducer = (
  state: blogsCategoryTypes.IBlogsCategory[] = initialState.blogsCategory,
  action: blogsCategoryTypes.IGetBlogsCategoryType,
): blogsCategoryTypes.IBlogsCategory[] => {
  switch (action.type) {
    case blogsCategoryTypes.GET_BLOGS_CATEGORY_ID:
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

export default blogsCategoryReducer
