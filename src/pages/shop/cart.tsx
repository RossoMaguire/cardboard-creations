/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getNextServerSideProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import styles from "scss/pages/cart.module.scss";
import { useCartContext } from "components/common/CartContext";
import axios from "axios";
import Link from "next/link";
import Item from "components/Cart/Item";

export default function Page({ products }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const { productsInCart, setProductsInCart, items } = useCartContext();
  const [itemNames, setItemNames] = React.useState<string[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

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

  return (
    <>
      <Header description={generalSettings.description} notSticky />

      <Head>
        <title>Cart - {generalSettings.title}</title>
      </Head>

      <main className="content content-single">
        <div className="wrap">
          {items.length > 0 ? (
            <>
              <div className={styles.cartItems}>
                {productsInCart.map((product) => {
                  return (
                    <Item
                      items={items}
                      product={product}
                      key={product.id}
                      setTotalAmount={setTotalAmount}
                    />
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
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

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
