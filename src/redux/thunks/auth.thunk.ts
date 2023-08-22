import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCredentials } from '../../types/user.type';
import { authUserWithEmailAndPassword, logOut } from '../../services/firebase.service';
import { FirebaseError } from 'firebase/app';

export const authThunk = createAsyncThunk(
  'firebase/auth',
  async ({ email, password }: UserCredentials, { rejectWithValue }) => {
    try {
      const authenticatedUser = await authUserWithEmailAndPassword({ email, password });
      const { email: registerEmail, uid } = authenticatedUser.user;
      const { token: accessToken, expirationTime } =
        await authenticatedUser.user.getIdTokenResult();

      return { userData: { email: registerEmail, uid }, accessToken, expirationTime };
    } catch (error) {
      const serializableError = error as FirebaseError;
      return rejectWithValue({
        code: serializableError.code,
        meta: serializableError.customData,
        name: serializableError.name,
      });
    }
  }
);

export const logoutThunk = createAsyncThunk('firebase/logout', async (_, { rejectWithValue }) => {
  try {
    await logOut();
  } catch (error) {
    const serializableError = error as FirebaseError;
    return rejectWithValue({
      code: serializableError.code,
      meta: serializableError.customData,
      name: serializableError.name,
    });
  }
});
