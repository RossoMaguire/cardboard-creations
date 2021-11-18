import { getNextServerSideProps, getNextStaticProps } from "@faustjs/next";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import { CTA, Footer, Header, Hero } from "components";
import styles from "scss/pages/home.module.scss";
import { client } from "client";
import axios from "axios";
import EtsyReviews from "components/Reviews/EtsyReviews";
import PromoBanner from "components/PromoBanner";
import ImageGrid from "components/ImageGrid";
import homeGridImages from "../repositories/imageGrid";
import Button from "components/Button";
import BackgroundVideo from "components/BackgroundVideo";
import ContactForm from "components/ContactForm";
import Affiliates from "components/Affiliates";
import ProductDetail from "components/Products/ProductDetail";
import ServiceGrid from "components/ServiceGrid";

export default function Page({ products = null }) {
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

  return (
    <>
      <Header description={generalSettings.description} />
      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>
      <main className="content">
        <Hero
          bgImage="/images/homepage-banner.jpeg"
          id={styles.home_hero}
          hasOverlay={false}
        />
        <section className={styles.explore}>
          <ProductDetail product={getBestSeller(products)} />
        </section>
        <section className={styles.explore}>
          <EtsyReviews />
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
        <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on GitHub"
          buttonURL="https://github.com/wpengine/faustjs/discussions"
          headingLevel="h2"
        >
          <p>
            We welcome feature requests, bug reports and questions in the{" "}
            <a href="https://github.com/wpengine/faustjs">
              Headless Framework GitHub repository
            </a>
            .
          </p>
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
  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      products,
    },
  });
}
