/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import axios from "axios";
import _ from "lodash";
import { client } from "client";
import { Footer, Header, Hero, ProductDetail } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";

export default function Page({ products = null, pageUri }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const getThisProduct = ({ products }) => {
    const thisProduct: Product = products.filter((product) => {
      return product.slug === pageUri;
    });

    return thisProduct[0];
  };

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>Product - {generalSettings.title}</title>
      </Head>

      <Hero
        title={getThisProduct(products).name}
        bgImage={getThisProduct(products).images[0].src}
      />

      <main className="content content-single">
        <div className="wrap">
          <h3>Products</h3>
          <ProductDetail product={getThisProduct(products)} />
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
      pageUri: context.params.productSlug,
    },
    revalidate: 10,
  });
}

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );

  // Get the paths we want to pre-render based on products
  const paths = products.products.map((product) => ({
    params: { productSlug: product.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
