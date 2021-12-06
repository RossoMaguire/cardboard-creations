/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/EtsyReviews.module.scss";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface IEtsyReviewsProps {
  topRated: Review[];
}

function EtsyReviews({ topRated }: IEtsyReviewsProps): JSX.Element {
  const [featuredReviews, setFeaturedReviews] = React.useState([]);

  React.useEffect(() => {
    const featured = topRated.slice(0, 3);
    setFeaturedReviews(featured);
  }, [topRated]);

  return (
    <div className="wrap">
      <img
        alt="Etsy Logo Heart"
        src="/images/etsy-logo-heart.jpeg"
        style={{ height: "90px", width: "auto", float: "right" }}
      />
      <div className={styles.features}>
        {featuredReviews.map((review, index) => {
          return (
            <div
              className={styles.feature}
              key={`${index}-${review.buyer_user_id}`}
            >
              <span>{Array(review.rating).fill(<StarBorderIcon />)}</span>
              <div style={{ height: "60px" }}>
                <h3>{review.review}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EtsyReviews;
