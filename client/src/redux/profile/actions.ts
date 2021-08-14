import { Dispatch } from "redux"

import { AUTH, IAuthType, IAuth } from "./../auth/types"
import { IAlertType, ALERT } from "../alert/types"
import { IGetOtherInfoType, GET_OTHER_INFO } from "./types"
import { checkImage, imageUpload } from "../../utils/ImageUpload"
import { patchAPI, getAPI } from "../../utils/fetchData"
import { checkPassword } from "../../utils/valid"

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) {
      return
    }

    let url: string = ""
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      if (avatar) {
        const check = checkImage(avatar)
        if (check) {
          return dispatch({ type: ALERT, payload: { errors: check } })
        }

        const photo = await imageUpload(avatar)
        url = photo.url
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: auth.user.name,
          },
        },
      })

      const res = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token,
      )

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const message = checkPassword(password, cf_password)
    if (message) {
      return dispatch({ type: ALERT, payload: { errors: message } })
    }

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await patchAPI("reset_password", { password }, token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const getOtherInfo =
  (id: string) =>
  async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI(`user/${id}`)
      dispatch({ type: GET_OTHER_INFO, payload: res.data })

      dispatch({ type: ALERT, payload: {} })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
