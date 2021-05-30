import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../config/generateToken';

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await Users.findOne({ account })
      if (user) {
        return res.status(400).json({ msg: '入力したメールアドレスまたは電話番号はすでに存在します。' })
      }

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = { name, account, password: passwordHash }

      const active_token = generateAccessToken({ newUser })

      res.json({
        status: 'OK',
        msg: '正常に登録が出来ました。',
        data: newUser,
        active_token,
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default authCtrl
