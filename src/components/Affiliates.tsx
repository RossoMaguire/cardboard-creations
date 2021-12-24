import React from "react";
import { logos } from "../utils/data/affiliate-logos";
import styles from "scss/pages/home.module.scss";

function Affiliates() {
  return (
    <div className="wrap">
      <div className={styles.affiliates}>
        {logos.map((logo, index) => {
          return (
            <div key={`logo-${index}`} className={styles.affiliate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/affiliates/${logo.src}`}
                alt={logo.alt}
                data-testid="affiliate-logo"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Affiliates;
