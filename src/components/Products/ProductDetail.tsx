import CartButtons from "./CartButtons";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/ProductDetail.module.scss";

interface IBestSellerProps {
  product: Product;
  isBestSeller?: boolean;
}

function ProductDetail({ product, isBestSeller }: IBestSellerProps) {
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
          <CartButtons product={product} />
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
