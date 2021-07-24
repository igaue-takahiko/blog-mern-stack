import { IUserRegister } from "./globalTypes"
import { IBlog } from "./globalTypes"

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister
  const errors: string[] = []

  if (!name) {
    errors.push("名前の入力をお願いします。")
  }
  if (name.length > 20) {
    errors.push("名前は２０文字以内でお願いします。")
  }

  if (!account) {
    errors.push("メールアドレスか電話番号の入力をお願いします。")
  }
  if (!validPhone(account) && !validateEmail(account)) {
    errors.push("メールアドレスまたは電話番号の形式が正しくありません。")
  }

  if (password.length < 6) {
    errors.push("パスワードは６文字以上でお願いします。")
  }
  if (password !== cf_password) {
    errors.push("確認用のパスワードが一致しません。")
  }

  return {
    errorMsg: errors,
    errorLength: errors.length,
  }
}

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "パスワードは6文字以上でお願いします。"
  }

  if (password !== cf_password) {
    return "確認用のパスワードが一致しません。"
  }
}

export const validPhone = (phone: string) => {
  const re = /^[+]/g
  return re.test(phone)
}

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const error: string[] = []

  if (title.trim().length < 10) {
    error.push("タイトルは10文字以上でお願いします。")
  }
  if (title.trim().length > 50) {
    error.push("タイトルは最大50文字まででお願いします。")
  }

  if (content.trim().length < 1000) {
    error.push("コンテンツの文字数は1000文字以上でお願いします。")
  }

  if (description.trim().length < 10) {
    error.push("説明文は10文字以上でお願いします。")
  }
  if (description.trim().length > 200) {
    error.push("説明文は最大200文字まででお願いします。")
  }

  if (!thumbnail) {
    error.push("サムネイルを空のままに登録することはできません。")
  }

  if (!category) {
    error.push("カテゴリを選んでください。")
  }

  return {
    errorMsg: error,
    errorLength: error.length,
  }
}
