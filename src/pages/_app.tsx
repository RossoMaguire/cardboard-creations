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

import { motion } from "framer-motion";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <CartProvider>
        <FaustProvider client={client} pageProps={pageProps}>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </FaustProvider>
      </CartProvider>
    </>
  );
}
