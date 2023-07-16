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
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action, state);
      const { user, accessToken: token } = action.payload;
      state.user = user;
      state.token = token;

      const data = JSON.stringify({ user, token });
      localStorage.setItem('userCredentials', data);
    },

    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userCredentials');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
