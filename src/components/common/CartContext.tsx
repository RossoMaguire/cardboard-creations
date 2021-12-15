import { createContext, useContext, useEffect, useState } from "react";

import Cookie from "js-cookie";

const cartDefaultValues: CartContext = {
  cartCount: 0,
  totalAmount: 0,
  productsInCart: [] as Product[],
  setTotalAmount: () => {},
  setCartCount: () => {},
  setProductsInCart: () => {},
  items: [] as Item[],
  setItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
};

export const CartItemsContext = createContext<CartContext>(cartDefaultValues);

export function useCartContext() {
  return useContext(CartItemsContext);
}

export function CartProvider({ children }: ICartContextProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([] as Item[]);
  const [productsInCart, setProductsInCart] = useState([] as Product[]);

  useEffect(() => {
    Cookie.set("CardboardCreationsCartItems", JSON.stringify(items));
    localStorage.setItem("CardboardCreationsCartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    Cookie.set("CardboardCreationsCartCount", JSON.stringify(cartCount));
    localStorage.setItem(
      "CardboardCreationsCartCount",
      JSON.stringify(cartCount)
    );
  }, [cartCount]);

  useEffect(() => {
    Cookie.set("CardboardCreationsCartTotal", JSON.stringify(totalAmount));
    localStorage.setItem(
      "CardboardCreationsCartTotal",
      JSON.stringify(totalAmount)
    );
  }, [totalAmount]);

  const addToCart = async (name: string, price: string) => {
    setCartCount(cartCount + 1);
    setItems((prevState) => {
      const isItemInCart = prevState.find((item) => item.name === name);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.name === name
            ? { ...item, count: item.count + 1, price: item.price }
            : item
        );
      }

      return [...prevState, { name, count: 1, price: parseFloat(price) }];
    });
    setTotalAmount((prevState) => {
      return prevState + parseFloat(price);
    });
  };

  const removeFromCart = async (name: string, price: string) => {
    cartCount > 0 ? setCartCount(cartCount - 1) : setCartCount(0);
    setItems((prevState) => {
      return prevState.reduce((ack, item) => {
        if (item.name === name) {
          if (item.count === 1) return ack;
          return [
            ...ack,
            { ...item, count: item.count - 1, price: item.price },
          ];
        } else {
          return [...ack, item];
        }
      }, [] as Item[]);
    });
    setTotalAmount((prevState) => {
      return prevState - parseFloat(price);
    });
  };

  const value = {
    cartCount,
    items,
    productsInCart,
    setCartCount,
    setItems,
    totalAmount,
    setTotalAmount,
    setProductsInCart,
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
