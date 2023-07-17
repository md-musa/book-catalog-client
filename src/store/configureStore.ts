import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from './features/auth/authApiSlice';
import authReducer from './features/auth/authSlice';
import { bookApiSlice } from './features/books/bookApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
  },

  middleware: gDM => gDM().concat(authApiSlice.middleware, bookApiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
