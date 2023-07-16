import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include', // <---,
  prepareHeaders(headers, { getState }): Headers {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'auth-reducer',
  baseQuery: baseQuery,
  endpoints: builder => ({}),
});
