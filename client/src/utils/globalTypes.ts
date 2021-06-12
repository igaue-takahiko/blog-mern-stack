import { ChangeEvent, FormEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface Params {
  page: string
  slug: string
}

export interface UserLogin {
  account: string
  password: string
}

export interface Params {
  page: string
  slug: string
}

export interface User extends UserLogin {
  avatar: string
  createdAt: string
  name: string
  role: string
  type: string
  updatedAt: string
  _id: string
}