import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { CustomError, Doctor } from '../../models/models';
import { RootState } from '../store';

type DocFilter = {
  profileId: string
  categoryId: string
  userName: string
};

// eslint-disable-next-line import/prefer-default-export
export const docApi = createApi({
  reducerPath: 'docapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_HOST}/docs`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
    getOneDoc: builder.query<Doctor, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    updateDocInfo: builder.mutation<Doctor, any>({
      query: (body: any) => ({
        url: '/',
        method: 'PATCH',
        body,
      }),
    }),
    deleteDocInfo: builder.mutation<Doctor, any>({
      query: (body: any) => ({
        url: '/',
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllDocsQuery, useGetOneDocQuery, useUpdateDocInfoMutation, useDeleteDocInfoMutation,
} = docApi;
