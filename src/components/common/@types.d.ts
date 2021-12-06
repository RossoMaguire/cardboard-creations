declare type CartContext = {
  cartCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
};

declare interface ICartContextProps {
  children: ReactNode;
}
