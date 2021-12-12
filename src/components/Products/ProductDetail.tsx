/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useCartContext } from "components/common/CartContext";
import styles from "scss/components/ProductDetail.module.scss";
import Button from "components/Button";

interface IBestSellerProps {
  product: Product;
  isBestSeller?: boolean;
}

function ProductDetail({ product, isBestSeller }: IBestSellerProps) {
  const { cartCount, addToCart, removeFromCart, items } = useCartContext();
  const [itemCount, setItemCount] = React.useState(0);

  React.useEffect(() => {
    const thisItem = items.filter((item: Item) => item.name === product.slug);

    thisItem.length !== 0 ? setItemCount(thisItem[0].count) : setItemCount(0);
  }, [product.slug, cartCount, items]);

  return (
    <div className="wrap">
      <div className={styles.productDetail}>
        <div className={styles.productImage}>
          <img
            src={product.images[0].src}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className={styles.productDetails}>
          {isBestSeller && <h2>Our Best Seller</h2>}
          <h3>{product.name}</h3>
          <p>€{product.price}</p>
          <p style={{ fontWeight: "bold" }}>Quantity</p>
          <div className={styles.cartButtons}>
            <Button
              buttonText="-"
              handleClick={() => removeFromCart(product.slug)}
            />
            <span>{itemCount}</span>
            <Button
              buttonText="+"
              handleClick={() => addToCart(product.slug, product.price)}
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
