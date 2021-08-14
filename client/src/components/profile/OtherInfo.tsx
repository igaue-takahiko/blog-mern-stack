import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getOtherInfo } from "../../redux/profile/actions"
import { RootStore, IUser } from "../../utils/globalTypes"

import { SpinnerLoading } from "../global"

interface IProps {
  id: string
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state: RootStore) => state)

  const [other, setOther] = useState<IUser>()

  useEffect(() => {
    if (!id) {
      return
    }

    if (profile.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id))
    } else {
      const newUser = profile.find((user) => user._id === id)
      if (newUser) {
        setOther(newUser)
      }
    }
  }, [dispatch, id, profile])

  if (!other) {
    return <SpinnerLoading />
  }

  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>
      <h5 className="text-uppercase text-danger">{other.role}</h5>
      <div>
        名前: <span className="text-info">{other.name}</span>
      </div>
      <div>メールアドレス / 電話番号</div>
      <span className="text-info">{other.account}</span>
      <div>
        登録日:{" "}
        <span style={{ color: "#ffc107" }}>
          {new Date(other.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default OtherInfo
