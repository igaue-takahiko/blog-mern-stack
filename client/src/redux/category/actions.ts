import { Dispatch } from "redux"
import { ALERT, IAlertType } from "../alert/types"
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ICategoryType,
} from "./types"
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/fetchData"
import { ICategory } from "../../utils/globalTypes"

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI("category", { name }, token)

      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.date.msg } })
    }
  }

export const getCategories =
  () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI("category")

      dispatch({ type: GET_CATEGORIES, payload: res.data.categories })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.date.msg } })
    }
  }

export const updateCategory =
  (data: ICategory, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: UPDATE_CATEGORY, payload: data })

      await patchAPI(`category/${data._id}`, { name: data.name }, token)
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.date.msg } })
    }
  }

export const deleteCategory =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: DELETE_CATEGORY, payload: id })

      await deleteAPI(`category/${id}`, token)
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.date.msg } })
    }
  }
