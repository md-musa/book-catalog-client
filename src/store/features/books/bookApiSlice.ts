import { baseQuery } from '../../api/apiSlice';
import { createApi } from '@reduxjs/toolkit/query/react';

export const bookApiSlice = createApi({
  reducerPath: 'bookApi',
  baseQuery,
  tagTypes: ['books', 'singleBook'],

  transformResponse: (response, options) => {
    if (options?.queryKey === 'getBooks') {
      return {
        ...response,
        data: response.data.reverse(),
      };
    }
    return response;
  },

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
      query: params => ({
        url: `/books`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['books'],
    }),

    getSingleBook: builder.query({
      query: bookId => ({
        url: `/books/${bookId}`,
        method: 'GET',
      }),
      providesTags: ['singleBook'],
    }),

    updateBook: builder.mutation({
      query: ({ bookId, updatedData }) => ({
        url: `/books/${bookId}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['books', 'singleBook'],
    }),

    deleteBook: builder.mutation({
      query: bookId => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),

    postBookReview: builder.mutation({
      query: ({ bookId, ...data }) => {
        console.log(bookId, data);
        return {
          url: `/books/add-review/${bookId}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['books', 'singleBook'],
    }),
  }),
});

export const {
  usePostBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  usePostBookReviewMutation,
} = bookApiSlice;
