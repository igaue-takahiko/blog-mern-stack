import { Dispatch } from "redux"

import { ALERT, IAlertType } from "../alert/types"
import { checkTokenExp } from "../../utils/checkTokenExp"
import {
  ICreateCommentType,
  GET_COMMENTS,
  IGetCommentsType,
  IReplyCommentType,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  IUpdateType,
  DELETE_COMMENT,
  DELETE_REPLY,
  IDeleteType,
} from "./types"

import { IComment } from "../../utils/globalTypes"
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/fetchData"

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      const res = await postAPI("comment", data, access_token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const getComments =
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 4

      const res = await getAPI(`comments/blog/${id}?page=${num}&limit=${limit}`)

      dispatch({
        type: GET_COMMENTS,
        payload: { data: res.data.comments, total: res.data.total },
      })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      await postAPI("reply_comment", data, access_token)

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await patchAPI(`comment/${data._id}`, { data }, access_token)

      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      })

      dispatch({ type: ALERT, payload: { loading: false } })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      const res = await deleteAPI(`comment/${data._id}`, access_token)

      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
