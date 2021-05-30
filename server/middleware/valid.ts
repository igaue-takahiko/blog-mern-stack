import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, account, password } = req.body

  if (!name) {
    return res.status(400).json({ msg: '名前を入力してください。' })
  }
  if(name.length > 20) {
    return res.status(400).json({ msg: '名前は２０文字以内でお願いします。' })
  }

  if (!account) {
    return res.status(400).json({ msg: 'メールアドレスか電話番号の入力をしてください。' })
  }
  if (!validPhone(account) && !validateEmail(account)) {
    return res.status(400).json({ msg: 'メールアドレスまたは電話番号の形式が正しくありません。' })
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: 'パスワードは６文字以上でお願いします。' })
  }

  next()
}

function validPhone(phone: string) {
  const re = /^[+]/g
  return re.test(phone)
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}