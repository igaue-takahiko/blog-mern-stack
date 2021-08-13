import { IBlog } from "../../utils/globalTypes"

export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID"

export interface IBlogsCategory {
  id: string
  blogs: IBlog[]
  total: number
  search: string
}

export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_CATEGORY_ID
  payload: IBlogsCategory
}