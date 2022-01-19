import {
  ContactForm,
  FadeTransition,
  Footer,
  Header,
  Hero,
  ServiceGrid,
  StaffMembers,
  useCartContext,
} from "components";
import { Page as PageType, client } from "client";
import { getNextServerSideProps, is404 } from "@faustjs/next";

/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import parseCookies from "utils/parseCookies";

export interface PageProps {
  page: PageType | PageType["preview"]["node"] | null | undefined;
  cartCookies?: CartCookies;
  pageUri?;
}

export function PageComponent({
  pageUri,
  cartCookies = null,
  page,
}: PageProps) {
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
        <FadeTransition>
          <div className="wrap">
            <div dangerouslySetInnerHTML={{ __html: page?.content() ?? "" }} />
            {pageUri[0] === "about" && (
              <>
                <StaffMembers />
                <hr />
                <h3 style={{ marginTop: "2em" }}>How our products are made</h3>
                <h4>Reusable</h4>
                <p>
                  All of our creations are made from a heavy duty gloss coated
                  cardboard, which means they can be used multiple times, it is
                  splash resistant and lightweight but when folded it can hold
                  an incredible amount of weight.
                </p>

                <h4>Sustainable & Recycable</h4>
                <p>
                  Our creations are all made from recycled material, Paper and
                  cardboard pulp is pressed into large sheets and our machines
                  then cut out the shapes we need to produce our creations. Our
                  cardboard sheets are also fully recyclable. they can even be
                  recycled in a normal domestic bin.
                </p>
              </>
            )}
            {pageUri[0] === "contact" && (
              <ContactForm description="Still haven't found what you are looking for? Get in touch and let us know! " />
            )}
          </div>
          <ServiceGrid />
        </FadeTransition>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page({ cartCookies, pageUri }) {
  const { usePage } = client;
  const page = usePage();

  return (
    <PageComponent page={page} cartCookies={cartCookies} pageUri={pageUri} />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context.req);

  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      pageUri: context.params.pageUri,
      cartCookies: {
        CardboardCreationsCartCount:
          cookies.CardboardCreationsCartCount || String(null),
        CardboardCreationsCartItems:
          cookies.CardboardCreationsCartItems || String(null),
        CardboardCreationsCartTotal:
          cookies.CardboardCreationsCartTotal || String(null),
      },
    },
    notFound: await is404(context, { client }),
  });
}
