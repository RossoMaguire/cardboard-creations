/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/EtsyReviews.module.scss";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

interface IEtsyReviewsProps {
  topRated: Review[];
}

function EtsyReviews({ topRated }: IEtsyReviewsProps): JSX.Element {
  const [featuredReviews, setFeaturedReviews] = React.useState([]);

  React.useEffect(() => {
    const featured = topRated.slice(0, 6);
    setFeaturedReviews(featured);
  }, [topRated]);

  return (
    <div className="wrap">
      <img
        alt="Etsy Logo Heart"
        src="/images/etsy-logo-heart.jpeg"
        style={{ height: "90px", width: "auto", float: "right" }}
      />
      {featuredReviews.length > 0 && (
        <Carousel
          autoPlay
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop
          stopOnHover={false}
        >
          {_.chunk(featuredReviews, 3).map((chunk: any[], chunkIdx: any) => (
            <div key={`row-${chunk}-${chunkIdx}`} className={styles.features}>
              {chunk.map((review, reviewIdx) => (
                <div
                  className={styles.feature}
                  key={`revew-${reviewIdx}-${review.buyer_user_id}`}
                >
                  <span>
                    <StarBorderIcon />
                    <StarBorderIcon />
                    <StarBorderIcon />
                    <StarBorderIcon />
                    <StarBorderIcon />
                  </span>
                  <div style={{ height: "60px" }}>
                    <h3>{review.review}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default EtsyReviews;
