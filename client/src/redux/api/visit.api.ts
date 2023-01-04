import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  CustomError, Visit,
} from '@/models/models';

import type { RootState } from '../types';

type VistiDto = Omit<Visit, 'id' | 'docId' | 'userId' | 'createdAt' | 'updatedAt'> & {
  visitDate: Date;
  description: string;
  diagnose: string;
  treatment: string;
};

export const visitApi = createApi({
  reducerPath: 'visitApi',
  tagTypes: ['Pets', 'Visits'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/visits`,
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
    addNewVisit: builder.mutation({
      query: (newVisit: VistiDto) => ({
        url: '/',
        method: 'POST',
        body: newVisit,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const { useAddNewVisitMutation } = visitApi;
