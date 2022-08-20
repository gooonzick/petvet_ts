import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface CustomError {
    data: {
      message: string
    }
    status: number
  }

export interface User {
    name: string
    email:string
    phone: string
    img:string
    userGroupId: number
  }

export interface UserResponse {
    user: User
    token: string
  }

export interface SigninRequest {
    email: string
    password: string
  }

export interface SignupRequest {
    username: string
    email: string
    password: string
    phone: string
    userGroupId: number
  }
