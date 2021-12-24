import Button from "./Button";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/ServiceGrid.module.scss";

function ServiceGrid() {
  return (
    <div className="wrap">
      <div className={styles.services}>
        <div className={styles.service}>
          <img
            src="/images/service-grid/eco-friendly.webp"
            alt="Eco Friendly"
          />
          <h3>Recyclable and re-usable</h3>
          <p>
            We believe in a sustainable future, our products are fully
            recyclable and also made from recycled material.{" "}
          </p>
          <Button buttonText="Learn more" buttonURL="/posts/eco-friendly" />
        </div>
        <div className={styles.service}>
          <img
            src="/images/service-grid/customer-photos.jpg"
            alt="Customer Photos"
          />
          <h3>Customer Photos</h3>
          <p>
            Have a look at some pictures from our happy customers if you need
            ideas on how to use or decorate our cardboard creations.
          </p>
          <Button buttonText="See more" buttonURL="/customer-photos" />
        </div>
        <div className={styles.service}>
          <img
            src="/images/service-grid/faqs-image.webp"
            alt="Have Questions?"
          />
          <h3>Have Questions?</h3>
          <p>
            Still wondering what Cardboard Creations are doing and how? Find
            more about our products by reading what others have been asking.
          </p>
          <Button buttonText="Read more" buttonURL="/faqs" />
        </div>
      </div>
    </div>
  );
}

export default ServiceGrid;
