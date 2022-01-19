/* eslint-disable react-hooks/exhaustive-deps */
import { FadeTransition, Footer, Header, useCartContext } from "components";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Item from "components/Cart/Item";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { client } from "client";
import { getNextServerSideProps } from "@faustjs/next";
import parseCookies from "utils/parseCookies";
import styles from "scss/pages/cart.module.scss";

export default function Page({ cartCookies = null, products = null }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const {
    productsInCart,
    setProductsInCart,
    items,
    totalAmount,
    setCartCount,
    setItems,
    setTotalAmount,
  } = useCartContext();
  const [itemNames, setItemNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const slugs = items.map((item) => item.name);
    setItemNames(slugs);
  }, [items]);

  React.useEffect(() => {
    const inventory = products.products.filter((product) =>
      itemNames.includes(product.slug)
    );

    setProductsInCart(inventory);
  }, [itemNames, products.products, setProductsInCart]);

  React.useEffect(() => {
    cartCookies.CardboardCreationsCartCount !== "null" &&
      setCartCount(parseInt(cartCookies.CardboardCreationsCartCount));

    cartCookies.CardboardCreationsCartItems !== "null" &&
      setItems(JSON.parse(cartCookies.CardboardCreationsCartItems));

    cartCookies.CardboardCreationsCartTotal !== "null" &&
      setTotalAmount(parseFloat(cartCookies.CardboardCreationsCartTotal));
  }, []);

  return (
    <>
      <Header description={generalSettings.description} notSticky />

      <Head>
        <title>Cart - {generalSettings.title}</title>
      </Head>

      <main className="content content-single">
        <FadeTransition>
          <div className="wrap">
            {items.length > 0 ? (
              <>
                <div className={styles.cartItems}>
                  {productsInCart.map((product) => {
                    return (
                      <Item items={items} product={product} key={product.id} />
                    );
                  })}
                </div>
                <div className={styles.total}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      Total: €{totalAmount}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2>No Products in Cart</h2>
                <p>
                  Visit the <Link href="/shop">Shop</Link> to get started
                </p>
              </>
            )}
          </div>
        </FadeTransition>
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
