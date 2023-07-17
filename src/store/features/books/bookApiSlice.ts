import { baseQuery } from '../../api/apiSlice';
import { createApi } from '@reduxjs/toolkit/query/react';

export const bookApiSlice = createApi({
  reducerPath: 'bookApi',
  baseQuery,
  tagTypes: ['books'],

  endpoints: builder => ({
    postBook: builder.mutation({
      query: bookData => ({
        url: `/books`,
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['books'],
    }),

    getBooks: builder.query({
      query: book => ({
        url: `/books`,
        method: 'GET',
        body: book,
      }),
      providesTags: ['books'],
    }),

    getSingleBook: builder.query({
      query: bookId => ({
        url: `/books/${bookId}`,
        method: 'GET',
      }),
    }),

    updateBook: builder.query({
      query: ({ bookId, updatedData }) => ({
        url: `/books/${bookId}`,
        method: 'GET',
        body: updatedData,
      }),
      // invalidatesTags: ['books'],
    }),

    deleteBook: builder.mutation({
      query: bookId => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  usePostBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookQuery,
} = bookApiSlice;
