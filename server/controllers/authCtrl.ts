import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { OAuth2Client } from "google-auth-library"
import fetch from "node-fetch"

import Users from "../models/userModel"
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken"
import { validateEmail, validPhone } from "../middleware/valid"
import sendMail from "../config/sendMail"
import { sendSms, smsOTP, smsVerity } from "../config/sendSMS"
import {
  IDecodedToken,
  IUser,
  IGooglePayload,
  IUserParams,
  IReqAuth,
} from "../config/interface"

const CLIENT_URL = `${process.env.BASE_URL}`
const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await Users.findOne({ account })
      if (user) {
        return res.status(400).json({
          msg: "入力したメールアドレスまたは電話番号はすでに存在します。",
        })
      }

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = { name, account, password: passwordHash }

      const active_token = generateActiveToken({ newUser })

      const url = `${CLIENT_URL}/active/${active_token}`

      if (validateEmail(account)) {
        sendMail(account, url, "あなたのメールアドレスを確認してください。")
        return res.json({
          msg: "仮登録が出来ました。 メールを確認してください。",
        })
      }

      if (validPhone(account)) {
        sendSms(account, url, "電話番号の確認です。")
        return res.json({
          msg: "仮登録が出来ました。 SMSを確認してください。",
        })
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      )

      const { newUser } = decoded

      if (!newUser) {
        return res.status(400).json({ msg: "無効な認証です。" })
      }

      const user = await Users.findOne({ account: newUser.account })
      if (user) {
        return res
          .status(400)
          .json({ msg: "アカウントはすでに存在しています。" })
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
        return res
          .status(400)
          .json({ msg: "そのアカウントは登録できていません。" })
      }

      loginUser(user, password, res)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    try {
      res.clearCookie("refresh_token", { path: `/api/refresh_token` })

      await Users.findOneAndUpdate(
        { _id: req.user?._id },
        {
          rf_token: "",
        },
      )

      return res.json({ msg: "ログアウトが完了しました!" })
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

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      )
      if (!decoded.id) {
        return res.status(400).json({ msg: "今すぐログインしてください！" })
      }

      const user = await Users.findById(decoded.id).select(
        "-password +rf_token",
      )
      if (!user) {
        return res.status(400).json({ msg: "そのアカウントは存在しません。" })
      }

      if (rf_token !== user.rf_token) {
        return res.status(400).json({ msg: "今すぐログインしてくだい！" })
      }

      const access_token = generateAccessToken({ id: user._id })
      const refresh_token = generateRefreshToken({ id: user._id }, res)

      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        },
      )

      res.json({ access_token, user })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body
      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      })

      const { email, email_verified, name, picture } = <IGooglePayload>(
        verify.getPayload()
      )

      if (!email_verified) {
        return res.status(500).json({ msg: "メールの確認に失敗しました。" })
      }

      const password = `${email} your google secret password`
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await Users.findOne({ account: email })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture,
          type: "Google",
        }
        registerUser(user, res)
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  facebookLogin: async (req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body

      const URL = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res
        })

      const { email, name, picture } = data

      const password = `${email} your facebook secret password`
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await Users.findOne({ account: email })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture.data.url,
          type: "Facebook",
        }
        registerUser(user, res)
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  loginSMS: async (req: Request, res: Response) => {
    try {
      const { phone } = req.body

      const data = await smsOTP(phone, "sms")
      res.json(data)
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  smsVerify: async (req: Request, res: Response) => {
    try {
      const { phone, code } = req.body

      const data = await smsVerity(phone, code)
      if (!data?.valid) {
        return res.status(400).json({ msg: "無効な認証。" })
      }

      const password = `${phone} your phone secret password`
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await Users.findOne({ account: phone })

      if (user) {
        loginUser(user, password, res)
      } else {
        const user = {
          name: phone,
          account: phone,
          password: passwordHash,
          type: "SMS",
        }
        registerUser(user, res)
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { account } = req.body

      const user = await Users.findOne({ account })
      if (!user) {
        return res.status(400).json({ msg: "このアカウントは存在しません。" })
      }

      const access_token = generateAccessToken({ id: user._id })

      const url = `${CLIENT_URL}/reset_password/${access_token}`

      if (validPhone(account)) {
        sendSms(account, url, "パスワードをお忘れですか？")
        return res.json({
          msg: "再登録が完了しました！お使いの携帯電話を確認してください！",
        })
      } else if (validateEmail(account)) {
        sendMail(account, url, "パスワードをお忘れですか？")
        return res.json({
          msg: "再登録が完了しました！お使いのメールアドレスを確認してください！",
        })
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    let msgError =
      user.type === "register"
        ? "パスワードが正しくありません"
        : `パスワードが正しくありません。このアカウントで${user.type}ログインしたらログインできます。`

    return res.status(400).json({ msg: msgError })
  }

  const access_token = generateAccessToken({ id: user._id })
  const refresh_token = generateRefreshToken({ id: user._id }, res)

  await Users.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    },
  )

  res.json({
    msg: `${user.name}さん、お帰りなさい！`,
    access_token,
    user: { ...user._doc, password: "" },
  })
}

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user)

  const access_token = generateAccessToken({ id: newUser._id })
  const refresh_token = generateRefreshToken({ id: newUser._id }, res)

  newUser.rf_token = refresh_token
  await newUser.save()

  res.json({
    msg: "ログイン登録が完了しました!",
    access_token,
    user: { ...newUser._doc, password: "" },
  })
}

export default authCtrl
