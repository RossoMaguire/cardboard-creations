/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import axios from "axios";
import _ from "lodash";
import { client } from "client";
import { Footer, Header, Hero } from "components";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import ProductDetail from "components/Products/ProductDetail";

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
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Product - {generalSettings.title}</title>
      </Head>

      <Hero title={generalSettings.title} />

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

export async function getStaticProps(context: GetServerSidePropsContext) {
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
