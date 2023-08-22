/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { authThunk, logoutThunk } from '../thunks/auth.thunk';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { getCookie } from '../../utils/getCookie';
import { decodeToken, isTokenExpired } from '../../utils/decodeJWT';
import { IFirebaseToken } from '../../types/firebase.interface';

interface IAuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: {
    email: string | null;
    uid: string | null;
  } | null;
  accessToken: string | null;
  isExpired: boolean;
}

const initialState: IAuthState = {
  isAuth:
    getCookie('accessToken') !== undefined ? !isTokenExpired(getCookie('accessToken')!) : false,
  success: Boolean(getCookie('accessToken')) !== false,
  error: null,
  loading: false,
  userData:
    getCookie('accessToken') !== undefined
      ? {
          email: decodeToken<IFirebaseToken>(getCookie('accessToken')!).email,
          uid: decodeToken<IFirebaseToken>(getCookie('accessToken')!).user_id,
        }
      : null,
  accessToken: getCookie('accessToken') !== undefined ? getCookie('accessToken')! : null,
  isExpired:
    getCookie('accessToken') !== undefined ? isTokenExpired(getCookie('accessToken')!) : false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
      state.isExpired = false;
      state.userData = action.payload.userData;
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.success = false;
      state.accessToken = null;
      state.isAuth = false;
      state.isExpired = false;
      state.userData = null;
      state.error = null;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;
