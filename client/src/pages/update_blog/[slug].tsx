import React from "react"
import { useParams } from "react-router-dom"

import { IParams } from "../../utils/globalTypes"

import CreateBlog from "../create_blog"

const UpdateBlog: React.FC = () => {
  const { slug } = useParams<IParams>()

  return <CreateBlog id={slug} />
}

export default UpdateBlog
