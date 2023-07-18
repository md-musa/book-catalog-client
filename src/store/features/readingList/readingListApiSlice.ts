import { baseQuery } from '../../api/apiSlice';
import { createApi } from '@reduxjs/toolkit/query/react';

export const readingListApiSlice = createApi({
  reducerPath: 'readingList-api',
  baseQuery,

  tagTypes: ['readingLists'],
  endpoints: builder => ({
    addToReadingList: builder.mutation({
      query: bookId => ({
        url: `/readingLists/${bookId}`,
        method: 'POST',
      }),
      invalidatesTags: ['readingLists'],
    }),

    getReadingList: builder.query({
      query: () => ({
        url: '/readingLists',
        method: 'GET',
      }),
      providesTags: ['readingLists'],
    }),

    markAsFinished: builder.mutation({
      query: ({ bookId, ...others }) => ({
        url: `/readingLists/${bookId}`,
        method: 'PATCH',
        body: others,
      }),
      invalidatesTags: ['readingLists'],
    }),
  }),
});

export const { useAddToReadingListMutation, useGetReadingListQuery, useMarkAsFinishedMutation } =
  readingListApiSlice;
