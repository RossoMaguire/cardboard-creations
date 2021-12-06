import "faust.config";
import { FaustProvider } from "@faustjs/next";
import "normalize.css/normalize.css";
import React from "react";
import "scss/main.scss";
import { client } from "client";
import type { AppProps } from "next/app";
import { CartProvider } from "components/common/CartContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <FaustProvider client={client} pageProps={pageProps}>
          <Component {...pageProps} />
        </FaustProvider>
      </CartProvider>
    </>
  );
}
