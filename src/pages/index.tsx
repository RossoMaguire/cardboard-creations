import { getNextServerSideProps } from "@faustjs/next";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import {
  CTA,
  Footer,
  Header,
  Hero,
  EtsyReviews,
  PromoBanner,
  ImageGrid,
  Button,
  BackgroundVideo,
  ContactForm,
  Affiliates,
  ProductDetail,
  ServiceGrid,
} from "components";
import styles from "scss/pages/home.module.scss";
import { client } from "client";
import axios from "axios";
import homeGridImages from "../repositories/image-grid";

export default function Page({ products = null, reviews = null }) {
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: 6,
    where: {
      categoryName: "uncategorized",
    },
  });

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
          />
        </section>
        <section className={styles.explore}>
          <div className="wrap">
            <div className={styles.images}>
              <ImageGrid images={homeGridImages} />
              <div className={styles.promo}>
                <span>What makes us different</span>
                <h3>ECO FRIENDLY & REUSABLE</h3>
                <p>
                  Our candy carts, home bars, ferris wheels and plinths are
                  reusable and made from fully recyclable materials
                </p>
                <Button buttonText="Learn More" buttonURL="#" />
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
        {/* <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        /> */}
        <CTA title="Questions or comments?" headingLevel="h2">
          <p>Follow us on Social Media</p>
        </CTA>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const { data: products } = await axios.get(
//     process.env.BASE_URL + "/api/woocommerce/products"
//   );
//   return getNextStaticProps(context, {
//     Page,
//     client,
//     props: {
//       products,
//     },
//   });
// }
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );
  const { data: reviews } = await axios.get(
    process.env.BASE_URL + "/api/etsy/reviews"
  );
  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      products,
      reviews,
    },
  });
}
