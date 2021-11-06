import React from "react";
import styles from "scss/components/EtsyReviews.module.scss";

const reviewData = [
  /* reviews from Etsy API will be here */
  {
    stars: "****",
    title: "This looked great",
    name: "Christie",
  },
  {
    stars: "****",
    title: "Perfect for my daughters ice cream themed birthday!",
    name: "Ali",
  },
  {
    stars: "****",
    title: "I love the Candy Cart!",
    name: "Sophia",
  },
];

function EtsyReviews(): JSX.Element {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    setReviews(reviewData);
  }, []);

  return (
    <div className="wrap">
      <div className={styles.features}>
        {reviews.map((review, index) => {
          return (
            <div className={styles.feature} key={index}>
              <span>{review.stars}</span>
              <h3>{review.title}</h3>
              <p>{review.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EtsyReviews;
