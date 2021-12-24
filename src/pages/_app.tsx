import "../../faust.config";
import "normalize.css/normalize.css";
import "../utils/sticky-header/sticky-header.css";
import "../utils/mobile-menu.css";
import "scss/main.scss";

import type { AppProps } from "next/app";
import { CartProvider } from "components/common/CartContext";
import { FaustProvider } from "@faustjs/next";
import React from "react";
import { client } from "client";

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
