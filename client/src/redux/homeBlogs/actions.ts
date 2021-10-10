import { Dispatch } from "redux"
import { IBlog } from "../../utils/globalTypes"
import { ALERT, IAlertType } from "../alert/types"
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "./types"
import { imageUpload } from "../../utils/ImageUpload"
import { postAPI, getAPI, putAPI } from "../../utils/fetchData"
import { checkTokenExp } from "../../utils/checkTokenExp"

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    let url: string = ""
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail)
        url = photo.url
      } else {
        url = blog.thumbnail
      }

      const newBlog = { ...blog, thumbnail: url }

      const res = await postAPI("blog", newBlog, access_token)

      dispatch({ type: ALERT, payload: { loading: false } })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI("home/blogs")

      dispatch({ type: GET_HOME_BLOGS, payload: res.data })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const updateBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    let url
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail)
        url = photo.url
      } else {
        url = blog.thumbnail
      }

      const newBlog = { ...blog, thumbnail: url }

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
