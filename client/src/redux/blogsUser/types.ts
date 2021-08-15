import { IBlog } from '../../utils/globalTypes';

export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID"

export interface IBlogsUser {
  id: string
  blogs: IBlog[]
  total: number
  search: string
}

export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_USER_ID,
  payload: IBlogsUser
}
