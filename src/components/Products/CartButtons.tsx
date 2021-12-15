import Button from "components/Button";
import React from "react";
import styles from "scss/components/ProductDetail.module.scss";
import { useCartContext } from "components/common/CartContext";

interface ICartButtonsProps {
  product: Product;
}

function CartButtons({ product }: ICartButtonsProps) {
  const { cartCount, addToCart, removeFromCart, items } = useCartContext();
  const [itemCount, setItemCount] = React.useState(0);

  React.useEffect(() => {
    const thisItem = items.filter((item: Item) => item.name === product.slug);

    thisItem.length !== 0 ? setItemCount(thisItem[0].count) : setItemCount(0);
  }, [product.slug, cartCount, items]);

  return (
    <div className={styles.cartButtons}>
      <Button
        buttonText="-"
        handleClick={() => removeFromCart(product.slug, product.price)}
        disabled={itemCount === 0}
      />
      <span data-testid="item-quantity">{itemCount}</span>
      <Button
        buttonText="+"
        handleClick={() => addToCart(product.slug, product.price)}
      />
    </div>
  );
}

export default CartButtons;
