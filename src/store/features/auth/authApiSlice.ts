import { baseQuery } from '../../api/apiSlice';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  reducerPath: 'auth-api',
  baseQuery,

  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: userData => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApiSlice;
