import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  CustomError,
} from '../../models/models';
import type { RootState } from '../types';

export const diseaseApi = createApi({
  reducerPath: 'diseaseApi',
  tagTypes: ['Pets', 'Disease'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/allergies`,
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
    addNewDisease: builder.mutation({
      query: (disease: { petId: number, name: string }) => ({
        url: '/',
        method: 'POST',
        body: disease,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const { useAddNewDiseaseMutation } = diseaseApi;
