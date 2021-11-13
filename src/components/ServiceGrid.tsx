/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/pages/home.module.scss";
import Button from "./Button";

function ServiceGrid() {
  return (
    <div className="wrap">
      <div className={styles.features}>
        <div className={styles.feature}>
          <img
            src="/images/service-grid/eco-friendly.webp"
            alt="Eco Friendly"
          />
          <h3>Recyclable and re-usable</h3>
          <p>
            We believe in a sustainable future, our products are fully
            recyclable and also made from recycled material.{" "}
          </p>
          <Button buttonText="Learn more" buttonURL="#" />
        </div>
        <div className={styles.feature}>
          <img
            src="/images/service-grid/customer-photos.jpg"
            alt="Eco Friendly"
          />
          <h3>Customer Photos</h3>
          <p>
            Have a look at some pictures from our happy customers if you need
            ideas on how to use or decorate our cardboard creations.
          </p>
          <Button buttonText="See more" buttonURL="#" />
        </div>
        <div className={styles.feature}>
          <img src="/images/service-grid/faqs-image.webp" alt="Eco Friendly" />
          <h3>Have Questions?</h3>
          <p>
            Still wondering what Cardboard Creations are doing and how? Find
            more about our products by reading what others have been asking.
          </p>
          <Button buttonText="Read more" buttonURL="#" />
        </div>
      </div>
    </div>
  );
}

export default ServiceGrid;
