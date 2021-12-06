import { createContext, useContext, useState } from "react";

const cartDefaultValues: CartContext = {
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
};

const CartItemsContext = createContext<CartContext>(cartDefaultValues);

export function useCartContext() {
  return useContext(CartItemsContext);
}

export function CartProvider({ children }: ICartContextProps) {
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const removeFromCart = () => {
    cartCount > 0 ? setCartCount(cartCount - 1) : setCartCount(0);
  };

  const value = {
    cartCount,
    addToCart,
    removeFromCart,
  };

  return (
    <>
      <CartItemsContext.Provider value={value}>
        {children}
      </CartItemsContext.Provider>
    </>
  );
}
