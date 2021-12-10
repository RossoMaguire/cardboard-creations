declare type CartContext = {
  cartCount: number;
  items: Item[];
  setProductsInCart: Function;
  productsInCart: Product[];
  addToCart: Function;
  removeFromCart: Function;
};

declare type Item = {
  name: string;
  count: number;
};

declare interface ICartContextProps {
  children: ReactNode;
}
