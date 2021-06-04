import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Users from '../models/userModel';
import { generateActiveToken } from '../config/generateToken';
import { validateEmail, validPhone } from '../middleware/valid';
import sendMail from '../config/sendMail';
import { sendSms } from '../config/sendSMS';
import { DecodedToken } from '../config/intreface';

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

      const active_token = generateActiveToken({ newUser })

      const url = `${CLIENT_URL}/active/${active_token}`

      if (validateEmail(account)) {
        sendMail(account, url, 'あなたのメールアドレスを確認してください。')
        return res.json({ msg: "Success! Please check your email." })
      }

      if (validPhone(account)) {
        sendSms(account, url, '電話番号の確認です。')
        return res.json({ msg: "Success! Please check phone." })
      }

    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body

      const decoded = <DecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

      const { newUser } = decoded

      if (!newUser) {
        return res.status(400).json({ msg: "無効な認証です。" })
      }

      const user = new Users(newUser)

      await user.save()

      res.json({ msg: "アカウントが有効化されました！" })
    } catch (error) {
      let errorMessage

      if (error.code === 11000) {
        errorMessage = Object.keys(error.keyValue)[0] + " already exists."
      } else {
        let name = Object.keys(error.errors)[0]
        errorMessage = error.errors[`${name}`].message
      }

      return res.status(500).json({ msg: errorMessage })
    }
  }
}

export default authCtrl
