import * as categoryTypes from "./types"
import initialState from "../store/initialState"
import { ICategory } from "../../utils/globalTypes"

const categoryReducer = (
  state: ICategory[] = initialState.categories,
  action: categoryTypes.ICategoryType,
): ICategory[] => {
  switch (action.type) {
    case categoryTypes.CREATE_CATEGORY:
      return [action.payload, ...state]
    case categoryTypes.GET_CATEGORIES:
      return action.payload
    case categoryTypes.UPDATE_CATEGORY:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, name: action.payload.name }
          : item,
      )
    case categoryTypes.DELETE_CATEGORY:
      return state.filter((item) => item._id !== action.payload)
    default:
      return state
  }
}

export default categoryReducer
