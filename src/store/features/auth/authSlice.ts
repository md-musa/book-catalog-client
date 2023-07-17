import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  user: {
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
  } | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action, state);
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;

      const data = JSON.stringify({ user, accessToken });
      localStorage.setItem('userCredentials', data);
    },

    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('userCredentials');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
