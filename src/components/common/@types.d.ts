declare type CartContext = {
  cartCount: number;
  items: Item[];
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
