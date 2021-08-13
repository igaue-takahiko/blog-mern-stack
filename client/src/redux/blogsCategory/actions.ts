import { Dispatch } from "redux"
import { ALERT, IAlertType } from "../alert/types"
import { getAPI } from "../../utils/fetchData"
import { GET_BLOGS_CATEGORY_ID, IGetBlogsCategoryType } from "./types"

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 8
      let value = search ? search : `?page=${1}`

      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI(`blogs/${id}${value}&limit=${limit}`)

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search },
      })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
