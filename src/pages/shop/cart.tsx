/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import styles from "scss/pages/customer-photos.module.scss";
import { useCartContext } from "components/common/CartContext";
import axios from "axios";

export default function Page({ products }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const { productsInCart, setProductsInCart, items } = useCartContext();
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

  const getItemQuantity = (name: string) => {
    const sameName = items.filter((item) => {
      return item.name === name;
    });

    return sameName[0].count;
  };

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>Cart - {generalSettings.title}</title>
      </Head>

      <main className="content content-single">
        <div className="wrap">
          <div className={styles.customerPhotos}>
            {productsInCart.map((product) => {
              return (
                <div className="cart-item" key={product.id}>
                  <img src={product.images[0].src} alt={product.name} />
                  <p>{product.name}</p>
                  <p>Quantity: {getItemQuantity(product.slug)}</p>
                </div>
              );
            })}
          </div>
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
