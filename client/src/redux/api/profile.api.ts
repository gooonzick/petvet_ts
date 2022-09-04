import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CatergoryProfile, CustomError } from '../../models/models';

export const profileApi = createApi({
  reducerPath: 'profileapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST}/profiles`,
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    getAllProfiles: builder.query<CatergoryProfile[], void>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});

export const { useGetAllProfilesQuery } = profileApi;
