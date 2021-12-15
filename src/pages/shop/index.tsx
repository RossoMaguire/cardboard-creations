import { Button, Footer, Header, Hero } from "components";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import _ from "lodash";
import axios from "axios";
import { client } from "client";
import { getNextServerSideProps } from "@faustjs/next";
import parseCookies from "utils/parseCookies";
import styles from "scss/pages/shop.module.scss";
import { useCartContext } from "components/common/CartContext";

export default function Page({ cartCookies = null, products = null }) {
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

  const ccProducts: Product[] = products.products;

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>Shop - {generalSettings.title}</title>
      </Head>

      <Hero title="Shop" bgImage="images/home-promo-banner.jpeg" />

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
                  <Button
                    buttonText="Details"
                    buttonURL={`/shop/${product.slug}`}
                  />
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
