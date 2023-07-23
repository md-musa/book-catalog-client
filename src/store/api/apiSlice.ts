import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://book-catalog-one.vercel.app/api/v1',
  // credentials: 'include',
  prepareHeaders(headers, { getState }): Headers {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// export const apiSlice = createApi({
//   reducerPath: 'auth-reducer',
//   baseQuery: baseQuery,
//   endpoints: builder => ({}),
// });
