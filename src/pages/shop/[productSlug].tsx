import { Footer, Header, Hero, ProductDetail } from "components";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import _ from "lodash";
import axios from "axios";
import { client } from "client";
/* eslint-disable @next/next/no-img-element */
import { getNextServerSideProps } from "@faustjs/next";
import parseCookies from "utils/parseCookies";
import { useCartContext } from "components/common/CartContext";

export default function Page({ cartCookies = null, products = null, pageUri }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const { setCartCount, setItems, setTotalAmount } = useCartContext();

  React.useEffect(() => {
    cartCookies.CardboardCreationsCartCount !== "null" &&
      setCartCount(parseInt(cartCookies.CardboardCreationsCartCount));

    cartCookies.CardboardCreationsCartItems !== "null" &&
      setItems(JSON.parse(cartCookies.CardboardCreationsCartItems));

    cartCookies.CardboardCreationsCartTotal !== "null" &&
      setTotalAmount(parseFloat(cartCookies.CardboardCreationsCartTotal));
  }, []);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );

  const cookies = parseCookies(context.req);

  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      products,
      pageUri: context.params.productSlug,
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
