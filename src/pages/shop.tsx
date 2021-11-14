/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import axios from "axios";
import styles from "./../scss/pages/shop.module.scss";
import _ from "lodash";
import { client } from "client";
import { Footer, Header, Hero } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import Button from "components/Button";

export default function Page({ products }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const ccProducts: Product[] = products.products;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Shop - {generalSettings.title}</title>
      </Head>

      <Hero title="Shop" />

      <main className="content content-single">
        <div className="wrap">
          <h3>Products</h3>
          {_.chunk(ccProducts, 3).map((chunk: any[], chunkIdx: any) => (
            <div key={`row-${chunkIdx}`} className={styles.products}>
              {chunk.map((product, featureIdx) => (
                <div key={`feat-${featureIdx}`} className={styles.product}>
                  <div className={styles.productImage}>
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                    />
                  </div>
                  <p>€{product.price}</p>
                  <p>{product.name}</p>
                  <Button buttonText="Details" buttonURL="#" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      products,
    },
  });
}
