import { Request, Response } from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../config/generateToken';
import sendMail from '../config/sendMail';
import { validateEmail } from '../middleware/valid';

const CLIENT_URL = `${process.env.BASE_URL}`

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
      const url = `${CLIENT_URL}/active/${active_token}`

      if (validateEmail(account)) {
        sendMail(account, url, 'あなたのメールアドレスを確認してください。')
        return res.json({ msg: "Success! Please check your email." })
      }

    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

export default authCtrl
