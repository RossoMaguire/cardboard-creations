import { useEffect, createContext, useContext, useState } from "react";

const cartDefaultValues: CartContext = {
  cartCount: 0,
  productsInCart: [] as Product[],
  setProductsInCart: () => {},
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
};

const CartItemsContext = createContext<CartContext>(cartDefaultValues);

export function useCartContext() {
  return useContext(CartItemsContext);
}

export function CartProvider({ children }: ICartContextProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([] as Item[]);
  const [productsInCart, setProductsInCart] = useState([] as Product[]);

  useEffect(() => {
    localStorage.setItem("CardboardCreationsCartItems", JSON.stringify(items));
  }, [items]);

  const addToCart = async (name: string) => {
    setCartCount(cartCount + 1);
    setItems((prevState) => {
      const isItemInCart = prevState.find((item) => item.name === name);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.name === name ? { ...item, count: item.count + 1 } : item
        );
      }

      return [...prevState, { name, count: 1 }];
    });
    localStorage.setItem("CardboardCreationsCartItems", JSON.stringify(items));
  };

  const removeFromCart = async (name: string) => {
    cartCount > 0 ? setCartCount(cartCount - 1) : setCartCount(0);
    setItems((prevState) => {
      return prevState.reduce((ack, item) => {
        if (item.name === name) {
          if (item.count === 1) return ack;
          return [...ack, { ...item, count: item.count - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Item[]);
    });
  };

  const value = {
    cartCount,
    items,
    productsInCart,
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
