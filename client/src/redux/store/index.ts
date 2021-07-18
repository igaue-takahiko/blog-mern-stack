import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import authReducer from "../auth/reducers"
import alertReducer from "../alert/reducers"
import categoryReducer from "../category/reducers"

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  categories: categoryReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)
