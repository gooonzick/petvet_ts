import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CatergoryProfile, CustomError } from '../../models/models';

export const categoryApi = createApi({
  reducerPath: 'categoryapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST}/categories`,
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    getAllCategories: builder.query<CatergoryProfile[], void>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
