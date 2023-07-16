import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
  }),

  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: `/auth/signup`,
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: userData => ({
        url: `/auth/login`,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
