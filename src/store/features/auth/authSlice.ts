import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// interface IState {
//   user: {
//     name: {
//       firstName: string;
//       lastName: string;
//     };
//     email: string;
//   };
// }
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
