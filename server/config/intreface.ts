export interface NewUser {
  name: String
  account: String
  password: String
}

export interface DecodedToken {
  newUser?: NewUser
  iat: Number
  exp: Number
}