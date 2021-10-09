import { Dispatch } from "redux"

import { IBlog } from "../../utils/globalTypes"
import { ALERT, IAlertType } from "../alert/types"
import { getAPI, deleteAPI } from "../../utils/fetchData"
import {
  GET_BLOGS_USER_ID,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogsUserType,
  IGetBlogsUserType,
} from "./types"

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
      let limit = 3
      let value = search ? search : `?page=${1}`

      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`)

      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, search },
      })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const deleteBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
    try {
      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      })

      const res = await deleteAPI(`blog/${blog._id}`, token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
