import { Footer, Header, Hero } from "components";
import { Page as PageType, client } from "client";
import { getNextStaticProps, is404 } from "@faustjs/next";

/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import { useCartContext } from "components/common/CartContext";

export interface PageProps {
  page: PageType | PageType["preview"]["node"] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const { setCartCount, setItems, setTotalAmount } = useCartContext();

  React.useEffect(() => {
    localStorage.getItem("CardboardCreationsCartCount") &&
      setCartCount(
        parseInt(localStorage.getItem("CardboardCreationsCartCount"))
      );

    localStorage.getItem("CardboardCreationsCartItems") &&
      setItems(JSON.parse(localStorage.getItem("CardboardCreationsCartItems")));

    localStorage.getItem("CardboardCreationsCartTotal") &&
      setTotalAmount(
        parseFloat(localStorage.getItem("CardboardCreationsCartTotal"))
      );
  }, []);

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
      </Head>

      <Hero
        title={page?.title()}
        bgImage={page?.featuredImage?.node.sourceUrl()}
      />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? "" }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
