import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Users from '../models/userModel';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from '../config/generateToken';
import { validateEmail, validPhone } from '../middleware/valid';
import sendMail from '../config/sendMail';
import { sendSms } from '../config/sendSMS';
import { IDecodedToken, IUser } from '../config/interface';

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
        return res.json({ msg: "登録に出来ました。 メールを確認してください。" })
      }

      if (validPhone(account)) {
        sendSms(account, url, '電話番号の確認です。')
        return res.json({ msg: "登録に出来ました。 SMSを確認してください。" })
      }

    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body

      const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

      const { newUser } = decoded

      if (!newUser) {
        return res.status(400).json({ msg: "無効な認証です。" })
      }

      const user = await Users.findOne({ account: newUser.account })
      if (user) {
        return res.status(400).json({ msg: "アカウントはすでに存在しています。" })
      }

      const new_user = new Users(newUser)

      await new_user.save()

      res.json({ msg: "アカウントが有効化されました！" })
    } catch (error: any) {

      return res.status(500).json({ msg: error.message })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body

      const user = await Users.findOne({ account })
      if (!user) {
        return res.status(400).json({ msg: "そのアカウントは登録できていません。" })
      }

      loginUser(user, password, res)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refresh_token", { path: `/api/refresh_token` })

      return res.json({ msg: "ログアウトしました!" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refresh_token
      if (!rf_token) {
        return res.status(400).json({ msg: "今すぐログインしてください！" })
      }

      const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id) {
        return res.status(400).json({ msg: "今すぐログインしてください！" })
      }

      const user = await Users.findById(decoded.id).select("-password")
      if (!user) {
        return res.status(400).json({ msg: "そのアカウントは存在しません。" })
      }

      const access_token = generateAccessToken({ id: user._id })

      res.json({ access_token })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ msg: "パスワードが正しくありません。" })
  }

  const access_token = generateAccessToken({ id: user._id })
  const refresh_token = generateRefreshToken({ id: user._id })

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000 //30日
  })

  res.json({
    msg: "ログインできました！",
    access_token,
    user: { ...user._doc, password: "" }
  })
}

export default authCtrl
