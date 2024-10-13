"use client";

import { useState, createContext } from "react";

interface Product {
  name: string;
  price: number;
  image_url: string;
  amount_in_stock: number;
  category: string;
  stripe_price_id: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  products: Product;
}

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

export const CartContext = createContext({} as CartContextType);

interface Props {
  children: React.ReactNode;
}

export default function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
