import { createContext } from 'react';

export const CartContext = createContext<{
  cartItems: number;
  addToCart: (item: number) => void;
}>({
  cartItems: 0,
  addToCart: (item) => null,
});
