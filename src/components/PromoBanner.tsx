import Button from "./Button";
import React from "react";
import styles from "scss/components/PromoBanner.module.scss";

interface IPromoBannerProps {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  video?: boolean;
}

function PromoBanner({
  tagline,
  heading,
  description,
  buttonText,
  buttonUrl,
  video,
}: IPromoBannerProps) {
  return (
    <div className={video ? "video_wrap" : "wrap"}>
      <div className={styles.promo_block}>
        <div className={styles.promo}>
          <span>{tagline}</span>
          <h3>{heading}</h3>
          <p>{description}</p>
          <Button buttonText={buttonText} buttonURL={buttonUrl} />
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;
