import React from "react";
import { logos } from "../utils/data/affiliate-logos";
import styles from "scss/pages/home.module.scss";

function Affiliates() {
  return (
    <div className="wrap">
      <div className={styles.affiliates}>
        {logos.map((logo, index) => {
          return (
            <div
              key={`logo-${index}`}
              style={{
                display: "block",
                position: "relative",
                height: "150px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/affiliates/${logo.src}`}
                alt={logo.alt}
                style={{ width: "100%", height: "auto" }}
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
