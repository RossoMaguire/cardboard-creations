import React from "react";
import styles from "scss/pages/home.module.scss";

type AffiliateLogo = {
  src: string;
  alt: string;
};

const logos: AffiliateLogo[] = [
  {
    src: "local-enterprise-office.webp",
    alt: "Local Enterprise Office",
  },
  {
    src: "kildare-county-council.webp",
    alt: "Kildare County Council",
  },
  {
    src: "structural-investment-group.webp",
    alt: "EU Structural Investment Group",
  },
  {
    src: "european-union.webp",
    alt: "European Union",
  },
];

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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Affiliates;
