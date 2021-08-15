import { Dispatch } from "redux"

import { GET_BLOGS_USER_ID, IGetBlogsUserType } from "./types"
import { ALERT, IAlertType } from "../alert/types"
import { getAPI } from "../../utils/fetchData"

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
