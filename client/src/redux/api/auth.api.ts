import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  CustomError, SigninRequest, SignupRequest, UserResponse,
} from '../../models/models';
import { RootState } from '../store';

export const authApi = createApi({
  reducerPath: 'authapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else {
        const tokenLs = JSON.parse(sessionStorage.getItem('token') ?? '{}');
        if (!tokenLs) return headers;
        headers.set('authorization', `Bearer ${tokenLs}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
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
    isAuth: builder.query<UserResponse, void>({
      query: () => ({
        url: 'isauth',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useIsAuthQuery } = authApi;
