const nodemailer = require("nodemailer")
import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv"
dotenv.config()

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`

//send mail
const sendEmail = async (to: string, url: string, txt: string) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND,
  )

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  try {
    const access_token = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
      },
    })

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "伊賀上 尚彦",
      html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">ようこそ T.I-Blogへ！</h2>
          <p>おめでとうございます。これで、T.I-Blogを使い始める準備がほぼ整いました。</br>
              下のボタンをクリックして、あなたのメールアドレスを認証してください。
          </p>

          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">
            ${txt}
          </a>

          <p>何らかの理由でボタンが機能しない場合は、下のリンクをクリックすることでも登録できます。</p>

          <div>${url}</div>
        </div>
      `,
    }
    const result = await transport.sendMail(mailOptions)
    return result
  } catch (error) {
    console.log(error)
  }
}

export default sendEmail
