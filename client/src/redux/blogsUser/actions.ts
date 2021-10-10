import { Dispatch } from "redux"

import { IBlog } from "../../utils/globalTypes"
import { ALERT, IAlertType } from "../alert/types"
import { getAPI, deleteAPI } from "../../utils/fetchData"
import { checkTokenExp } from "../../utils/checkTokenExp"
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
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await deleteAPI(`blog/${blog._id}`, access_token)

      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      })

      dispatch({ type: ALERT, payload: { loading: false } })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
