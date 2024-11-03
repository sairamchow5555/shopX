import React, {createContext, useContext, useState} from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: any; // Adjust as needed
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const CartContext = createContext<{
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({cartItems: [], setCartItems: () => {}});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};
