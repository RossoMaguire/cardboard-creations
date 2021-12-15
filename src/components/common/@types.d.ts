declare type CartContext = {
  cartCount: number;
  items: Item[];
  totalAmount: number;
  setTotalAmount: Function;
  setProductsInCart: Function;
  setCartCount: Function;
  setItems: Function;
  productsInCart: Product[];
  addToCart: Function;
  removeFromCart: Function;
};

declare type Item = {
  name: string;
  count: number;
  price: number;
};

declare interface ICartContextProps {
  children: ReactNode;
}

declare type CartCookies = {
  CardboardCreationsCartCount: string;
  CardboardCreationsCartItems: string;
  CardboardCreationsCartTotal: string;
};
