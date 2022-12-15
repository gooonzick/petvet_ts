import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CustomError, Scheules } from '../../models/models';
import type { RootState } from '../types';

export const shcedulesApi = createApi({
  reducerPath: 'shcedulesApi',
  tagTypes: ['Schedules'],
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
      providesTags: (result, error, arg) => (result
        ? [...result.map(({ id }) => ({ type: 'Schedules' as const, id })), 'Schedules']
        : ['Schedules']),
    }),
    createNewSchedules: builder.mutation({
      query: (schedules) => ({
        method: 'POST',
        url: '/',
        body: schedules,
      }),
      invalidatesTags: ['Schedules'],
    }),
    deleteSchedule: builder.mutation({
      query: (scheduleId: number) => ({
        method: 'DELETE',
        url: `/${scheduleId}`,
      }),
      invalidatesTags: ['Schedules'],
    }),
    updateSchedule: builder.mutation({
      query: (schedule: Scheules) => ({
        method: 'PATCH',
        url: `/${schedule.id}`,
        body: schedule,
      }),
      invalidatesTags: ['Schedules'],
    }),
  }),
});

export const {
  useGetAllSchedulesQuery,
  useCreateNewSchedulesMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} = shcedulesApi;
