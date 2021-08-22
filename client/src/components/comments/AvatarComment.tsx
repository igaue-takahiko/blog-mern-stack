import React from "react"
import { Link } from "react-router-dom"

import { IUser } from "../../utils/globalTypes"

interface IProps {
  user: IUser
}

const AvatarComment: React.FC<IProps> = ({ user }) => {
  return (
    <div className="avatar_comment">
      <img src={user.avatar} alt="avatar" />
      <span className="d-block text-break">
        <Link to={`/profile/${user._id}`}>{user.name}</Link>
      </span>
    </div>
  )
}

export default AvatarComment
