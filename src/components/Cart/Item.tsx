/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from "react";

import styles from "scss/components/item.module.scss";

interface IItemProps {
  items: Item[];
  product: Product;
  setTotalAmount: Dispatch<SetStateAction<number>>;
}

function Item({ items, product, setTotalAmount }: IItemProps) {
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const getItemQuantity = () => {
      const sameName = items.filter((item) => {
        return item.name === product.slug;
      });
      return sameName[0].count;
    };

    const getItemPrice = () => {
      const sameName = items.filter((item) => {
        return item.name === product.slug;
      });

      return sameName[0].count * sameName[0].price;
    };

    setQuantity(getItemQuantity);
    setPrice(getItemPrice);
  }, []);

  React.useEffect(() => {
    setTotalAmount((prevState) => {
      return prevState + price;
    });
  }, [price]);

  return (
    <div className={styles.cartItem}>
      <img src={product.images[0].src} alt={product.name} />
      <div className={styles.itemDetails}>
        <h3>{product.name}</h3>
        <p style={{ fontWeight: "bold" }}>
          Quantity: <span style={{ fontWeight: "normal" }}>{quantity}</span>
        </p>
        <p style={{ fontWeight: "bold" }}>
          Price: <span style={{ fontWeight: "normal" }}>{`€${price}`}</span>
        </p>
      </div>
    </div>
  );
}

export default Item;
