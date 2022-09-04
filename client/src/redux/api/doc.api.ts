import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { CustomError, Doctor } from '../../models/models';

type DocFilter = {
  profileId: string
  categoryId: string
  userName: string
}

// eslint-disable-next-line import/prefer-default-export
export const docApi = createApi({
  reducerPath: 'docapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST}/docs`,
  }) as BaseQueryFn,
  endpoints: (builder) => ({
    getAllDocs: builder.query<Doctor[], DocFilter>({
      query: (args) => {
        const { profileId, categoryId, userName } = args;
        return {
          url: '/',
          params:
          {
            profileId,
            categoryId,
            userName,
          },
        };
      },
    }),
    getOneDoc: builder.query<Doctor, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetAllDocsQuery, useGetOneDocQuery } = docApi;
