/* eslint-disable react-hooks/exhaustive-deps */
import {
  Affiliates,
  BackgroundVideo,
  Button,
  CTA,
  ContactForm,
  EtsyReviews,
  Footer,
  Header,
  Hero,
  ImageGrid,
  ProductDetail,
  PromoBanner,
  ServiceGrid,
} from "components";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import axios from "axios";
import { client } from "client";
import { getNextServerSideProps } from "@faustjs/next";
import homeGridImages from "../repositories/image-grid";
import parseCookies from "../utils/parseCookies";
import styles from "scss/pages/home.module.scss";
import { useCartContext } from "components/common/CartContext";

export default function Page({
  products = null,
  reviews = null,
  cartCookies = null,
}) {
  const { setCartCount, setItems, setTotalAmount } = useCartContext();
  const { useQuery } = client;

  React.useEffect(() => {
    cartCookies.CardboardCreationsCartCount !== "null" &&
      setCartCount(parseInt(cartCookies.CardboardCreationsCartCount));

    cartCookies.CardboardCreationsCartItems !== "null" &&
      setItems(JSON.parse(cartCookies.CardboardCreationsCartItems));

    cartCookies.CardboardCreationsCartTotal !== "null" &&
      setTotalAmount(parseFloat(cartCookies.CardboardCreationsCartTotal));
  }, []);

  const generalSettings = useQuery().generalSettings;

  const getBestSeller = ({ products }) => {
    const featured: Product = products.filter((product) => {
      return product.featured;
    });

    return featured[0];
  };

  const getTopReviews = ({ results }) => {
    const topRated: Review[] = results.filter((review) => {
      return (
        review.rating === 5 &&
        review.language === "en" &&
        review.review.length < 500 &&
        review.review.length > 10 &&
        !review.review.includes("&#") &&
        !review.review.includes(";") &&
        !review.review.includes("instructions")
      );
    });

    return topRated;
  };

  return (
    <>
      <Header description={generalSettings.description} />
      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>
      <main id={styles.home_page} className={`content ${styles.home_content}`}>
        <Hero
          bgImage="/images/homepage-banner.jpeg"
          id={styles.home_hero}
          hasOverlay={false}
        />
        <section className={styles.explore}>
          <ProductDetail product={getBestSeller(products)} isBestSeller />
        </section>
        <section className={styles.explore}>
          <h3 style={{ textAlign: "center" }}>
            Our customers love our products!
          </h3>
          <EtsyReviews topRated={getTopReviews(reviews)} />
        </section>
        <section
          className={styles.explore}
          style={{
            backgroundImage: "url('/images/home-promo-banner.jpeg')",
          }}
        >
          <PromoBanner
            tagline="Unique"
            heading="Events and celebrations"
            description="Add a touch of creativity to your next party or event with our
            cardboard products"
            buttonText="Party Ideas"
            buttonUrl="/customer-photos"
          />
        </section>
        <section className={styles.explore}>
          <div className="wrap">
            <div className={styles.images}>
              <ImageGrid images={homeGridImages} />
              <div className={styles.promo}>
                <span>What makes us different</span>
                <h3>Eco Friendly & Reusable</h3>
                <p>
                  Our candy carts, home bars, ferris wheels and plinths are
                  reusable and made from fully recyclable materials
                </p>
                <Button
                  buttonText="Learn More"
                  buttonURL="/posts/eco-friendly"
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.explore}>
          <PromoBanner
            tagline="Quick"
            heading="Easy Assembly"
            description="Our cardboard products can be assembled by hand in a matter of minutes. No tools or screws required."
            buttonText="Assembly Videos"
            buttonUrl="/assembly-videos"
            video
          />
          <BackgroundVideo source="/videos/candy-cart-assembly-video.mp4" />
        </section>
        <section className={styles.explore}>
          <ContactForm
            heading="Curious about us?"
            description="Get in touch to find out more about Cardboard Creations and our products."
          />
        </section>
        <section className={styles.explore}>
          <Affiliates />
        </section>
        <section className={styles.explore}>
          <ServiceGrid />
        </section>

        <CTA title="Questions or comments?" headingLevel="h2">
          <p>Follow us on Social Media</p>
        </CTA>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );
  const { data: reviews } = await axios.get(
    process.env.BASE_URL + "/api/etsy/reviews"
  );

  const cookies = parseCookies(context.req);

  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      products,
      reviews,
      cartCookies: {
        CardboardCreationsCartCount:
          cookies.CardboardCreationsCartCount || String(null),
        CardboardCreationsCartItems:
          cookies.CardboardCreationsCartItems || String(null),
        CardboardCreationsCartTotal:
          cookies.CardboardCreationsCartTotal || String(null),
      },
    },
  });
}
