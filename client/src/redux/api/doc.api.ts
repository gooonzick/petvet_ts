import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { CustomError, Doctor } from '../../models/models';

type DocFilter = {
    profileName: string
    categoryName: string
    userName: string
}

const docApi = createApi({
  reducerPath: 'docapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_HOST}/docs`,
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    allDocs: builder.query<Doctor[], DocFilter>({
      query: (args) => {
        const { profileName, categoryName, userName } = args;
        return {
          url: '/',
          params:
          {
            profileName,
            categoryName,
            userName,
          },
        };
      },
    }),
    oneDoc: builder.query<Doctor, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});
