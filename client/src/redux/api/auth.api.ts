import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

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

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HOST ?? 'http://localhost:3010/api/v1/auth',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<UserResponse, SigninRequest>({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<UserResponse, SignupRequest>({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
