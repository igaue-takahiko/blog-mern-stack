import { Dispatch } from "redux"

import { ALERT, IAlertType } from "../alert/types"
import { CREATE_COMMENT, ICreateCommentType } from "./types"

import { IComment } from "../../utils/globalTypes"
import { postAPI } from "../../utils/fetchData"

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
