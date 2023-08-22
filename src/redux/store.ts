import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, authSlice } from './slices';

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
    authReduce: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
