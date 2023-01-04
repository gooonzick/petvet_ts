import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  Pet,
} from '../../models/models';
import type { RootState } from '../types';

export const petApi = createApi({
  reducerPath: 'petapi',
  tagTypes: ['Pets'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/pets`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn,
  endpoints: (builder) => ({
    getAllPets: builder.query<Pet[], void>({
      query: () => ({
        url: '/',
      }),
      providesTags: (result, error, arg) => (result
        ? [...result.map(({ id }) => ({ type: 'Pets' as const, id })), 'Pets']
        : ['Pets']),
    }),
    getOnePet: builder.query<Pet, number>({
      query: (petId: number) => ({
        url: `/${petId}`,
      }),
    }),
    addPet: builder.mutation({
      query: (petForm) => ({
        url: '/',
        method: 'POST',
        body: petForm,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});

export const { useAddPetMutation, useGetOnePetQuery, useGetAllPetsQuery } = petApi;
