import React from "react";
import styles from "scss/components/PromoBanner.module.scss";
import Button from "./Button";

interface IPromoBannerProps {
  bgImage?: string;
}

function PromoBanner({ bgImage }: IPromoBannerProps) {
  return (
    <section
      className={styles["promo-block"]}
      {...styles.promo_banner}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
    >
      <div className="wrap">
        <div className={styles.promo_block}>
          <div className={styles.promo}>
            <span>Unique</span>
            <h3>Events and celebrations</h3>
            <p>
              Add a touch of creativity to your next party or event with our
              cardboard products
            </p>
            <Button buttonText="Party Ideas" buttonURL="#" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
