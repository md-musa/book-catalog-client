import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from './features/auth/authApiSlice';
import authReducer from './features/auth/authSlice';
import { bookApiSlice } from './features/books/bookApiSlice';
import { wishlistApiSlice } from './features/wishlist/wishlistApiSlice';
import { readingListApiSlice } from './features/readingList/readingListApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    [wishlistApiSlice.reducerPath]: wishlistApiSlice.reducer,
    [readingListApiSlice.reducerPath]: readingListApiSlice.reducer,
  },

  middleware: gDM =>
    gDM().concat(
      authApiSlice.middleware,
      bookApiSlice.middleware,
      wishlistApiSlice.middleware,
      readingListApiSlice.middleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
