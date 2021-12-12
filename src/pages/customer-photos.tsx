import { Footer, Header, Hero } from "components";

import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { client } from "client";
/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import styles from "scss/pages/customer-photos.module.scss";

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const photos = useQuery().mediaItems().nodes;

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>Customer Photos - {generalSettings.title}</title>
      </Head>

      <Hero title="Customer Photos" bgImage={photos[0].guid} />

      <main className="content content-single">
        <div className="wrap">
          <div className={styles.customerPhotos}>
            {photos.map((photo) => (
              <div
                key={`customer-photo-${photo.id}`}
                className={styles.customerPhoto}
              >
                <img key={photo.id} src={photo.guid} alt="Customer Photo" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
