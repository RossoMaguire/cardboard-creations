import { getNextStaticProps } from "@faustjs/next";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import { CTA, Footer, Header, Hero, Posts } from "components";
import styles from "scss/pages/home.module.scss";
import { client } from "client";
import BestSeller from "components/Products/BestSeller";
import axios from "axios";
import EtsyReviews from "components/Reviews/EtsyReviews";
import PromoBanner from "components/PromoBanner";
import ImageGrid from "components/ImageGrid";
import homeGridImages from "../repositories/imageGrid";
import Button from "components/Button";

export default function Page({ products }) {
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: 6,
    where: {
      categoryName: "uncategorized",
    },
  });

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
          <BestSeller products={products.products} />
        </section>
        <section className={styles.explore}>
          <EtsyReviews />
        </section>
        <PromoBanner bgImage="/images/home-promo-banner.jpeg" />
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
        <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );
  console.log(products);
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      products,
    },
  });
}
