import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, '名前の入力は必須です。' ],
    trim: true,
    maxLength: [ 20, '名前は２０文字以内でお願いします。' ]
  },
  account: {
    type: String,
    required: [ true, 'メールアドレスまたは電話番号を入力してください。' ],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [ true, "パスワードの入力は必須です。" ],
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dhst2rbxf/image/upload/v1610678220/no-profile_xeeejw.png'
  },
  role: {
    type: String,
    default: 'user' // admin
  },
  type: {
    type: String,
    default: 'normal' // fast
  }
},{
  timestamps: true
})

export default mongoose.model('User', userSchema)