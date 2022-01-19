/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { CartButtons } from "components";
import React from "react";
import styles from "scss/components/Item.module.scss";

interface IItemProps {
  items: Item[];
  product: Product;
}

function Item({ items, product }: IItemProps) {
  const [price, setPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const getItemPrice = () => {
      const sameName = items.filter((item) => {
        return item.name === product.slug;
      });

      if (sameName[0] !== undefined)
        return sameName[0].count * sameName[0].price;
    };

    setPrice(getItemPrice);
  }, [items]);

  return (
    <div className={styles.cartItem}>
      <a href={`/shop/${product.slug}`}>
        <img src={product.images[0].src} alt={product.name} />
      </a>
      <div className={styles.itemDetails}>
        <h3>{product.name}</h3>
        <p style={{ fontWeight: "bold" }}>
          Price:{" "}
          <span
            data-testid="price"
            style={{ fontWeight: "normal" }}
          >{`€${price}`}</span>
        </p>
        <CartButtons product={product} />
      </div>
    </div>
  );
}

export default Item;
