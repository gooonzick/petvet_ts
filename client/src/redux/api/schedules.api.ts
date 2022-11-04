import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CustomError, Scheules } from '../../models/models';
import { RootState } from '../store';

export const shcedulesApi = createApi({
  reducerPath: 'shcedulesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/schedules`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    getAllSchedules: builder.query<Scheules[], string>({
      query: (date: string) => ({
        url: '/',
        params: { date },
      }),
    }),
  }),
});

export const { useGetAllSchedulesQuery } = shcedulesApi;
