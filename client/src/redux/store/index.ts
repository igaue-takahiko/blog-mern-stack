import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import authReducer from "../auth/reducers"
import alertReducer from "../alert/reducers"
import categoryReducer from "../category/reducers"
import homeBlogsReducer from "../homeBlogs/reducers"
import blogsCategoryReducer from "../blogsCategory/reducers"
import profileReducer from "../profile/reducers"
import blogsUserReducer from "../blogsUser/reducers"
import commentReducer from "../comment/reducers"
import socketReducer from "../socket/reducers"

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  categories: categoryReducer,
  homeBlogs: homeBlogsReducer,
  blogsCategory: blogsCategoryReducer,
  profile: profileReducer,
  blogsUser: blogsUserReducer,
  comments: commentReducer,
  socket: socketReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)
