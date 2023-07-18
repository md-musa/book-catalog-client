import { baseQuery } from '../../api/apiSlice';
import { createApi } from '@reduxjs/toolkit/query/react';

export const wishlistApiSlice = createApi({
  reducerPath: 'wishlist-api',
  baseQuery,

  tagTypes: ['wishlists'],
  endpoints: builder => ({
    addToWishlist: builder.mutation({
      query: bookId => ({
        url: `/wishlists/${bookId}`,
        method: 'POST',
      }),
      invalidatesTags: ['wishlists'],
    }),

    getWishlist: builder.query({
      query: () => ({
        url: '/wishlists',
        method: 'GET',
      }),
      providesTags: ['wishlists'],
    }),

    removeFromWishlist: builder.mutation({
      query: bookId => ({
        url: `/wishlists/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wishlists'],
    }),
  }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } =
  wishlistApiSlice;
