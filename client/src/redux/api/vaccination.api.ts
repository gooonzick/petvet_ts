import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  CustomError, Vaccinations,
} from '@/models/models';

import type { RootState } from '../types';

type VacDto = Omit<Vaccinations, 'drugDate'> & { petId: number, drugDate: Date };

export const vacApi = createApi({
  reducerPath: 'vacApi',
  tagTypes: ['Pets', 'Vaccination'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/vaccinations`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    createNewVac: builder.mutation<VacDto, any>({
      query: (body: any) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const { useCreateNewVacMutation } = vacApi;
