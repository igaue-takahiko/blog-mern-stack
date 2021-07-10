import { Response } from "express"
import { IReqAuth } from "./../config/interface"
import Users from "../models/userModel"

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ msg: "無効な認証です。" })
    }

    try {
      const { avatar, name } = req.body
      await Users.findByIdAndUpdate({ _id: req.user._id }, { avatar, name })

      res.json({ msg: "アップデートが出来しました。" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

export default userCtrl
