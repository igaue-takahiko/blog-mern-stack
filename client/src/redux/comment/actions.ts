import { Dispatch } from "redux"

import { ALERT, IAlertType } from "../alert/types"
import {
  CREATE_COMMENT,
  ICreateCommentType,
  GET_COMMENTS,
  IGetCommentsType,
} from "./types"

import { IComment } from "../../utils/globalTypes"
import { postAPI, getAPI } from "../../utils/fetchData"

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI("comment", data, token)

      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const getComments =
  (id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 8

      const res = await getAPI(`comments/blog/${id}?limit=${limit}`)

      dispatch({
        type: GET_COMMENTS,
        payload: { data: res.data.comments, total: res.data.total },
      })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
