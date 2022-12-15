import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  CustomError, User,
} from '../../models/models';
import type { RootState } from '../types';

export const userApi = createApi({
  reducerPath: 'userapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/users`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation<User, any>({
      query: (body: any) => ({
        url: '/',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useUpdateUserInfoMutation } = userApi;
