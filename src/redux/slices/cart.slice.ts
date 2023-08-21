import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import LocalRepository from '../../repositories/character.repository';

export interface AddToCartInterface {
  id: string | number;
  name: string;
  image: string;
  info: string;
}

interface RemoveFromCartInterface {
  id: string | number;
}

const initialState: Array<AddToCartInterface> = LocalRepository.getFromLocalStorage('cart') || [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartInterface>) => {
      const { id } = action.payload;
      if (state.length === 0 || state.filter((item) => item.id === id).length === 0) {
        state.push(action.payload);
        LocalRepository.saveOnLocalStorage('cart', state);
      }
    },
    removeFromCart: (state, action: PayloadAction<RemoveFromCartInterface>) => {
      const { id } = action.payload;
      if (state.some((item) => item.id === id)) {
        const newState = state.filter((item) => item.id !== id);
        LocalRepository.saveOnLocalStorage('cart', newState);
        return newState;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
