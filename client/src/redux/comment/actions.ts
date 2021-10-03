import { Dispatch } from "redux"

import { ALERT, IAlertType } from "../alert/types"
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
    try {
      const res = await postAPI("comment", data, token)

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
    try {
      await postAPI("reply_comment", data, token)

    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      })

      const res = await patchAPI(`comment/${data._id}`, { data }, token)

      dispatch({ type: ALERT, payload: { loading: false } })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
    try {
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      })

      const res = await deleteAPI(`comment/${data._id}`, token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
