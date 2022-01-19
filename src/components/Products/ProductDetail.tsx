import CartButtons from "./CartButtons";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/ProductDetail.module.scss";
import { Button } from "components";

interface IBestSellerProps {
  product: Product;
  isBestSeller?: boolean;
}

function ProductDetail({ product, isBestSeller }: IBestSellerProps) {
  const [shrink, setShrink] = React.useState("");

  React.useEffect(() => {
    setShrink(styles.shrink);
  }, []);

  return (
    <div className="wrap">
      <div className={styles.productDetail}>
        <div
          id={product.id.toString()}
          className={`${styles.productImage} ${shrink}`}
        >
          <a href={product.images[0].src} target="_blank" rel="noreferrer">
            <img
              src={product.images[0].src}
              alt={product.name}
              style={{ width: "100%" }}
            />
          </a>
        </div>
        <div className={styles.productDetails}>
          {isBestSeller && <h2>Our Best Seller</h2>}
          <h3>{product.name}</h3>
          <p>€{product.price}</p>
          <p style={{ fontWeight: "bold" }}>Quantity</p>
          <CartButtons product={product} />
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          {!isBestSeller && (
            <Button buttonURL="/shop/cart" buttonText="Go to Cart" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
