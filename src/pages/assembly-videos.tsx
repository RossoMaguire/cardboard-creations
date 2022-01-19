import {
  Footer,
  Header,
  Hero,
  ServiceGrid,
  FadeTransition,
  useCartContext,
} from "components";

/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import _ from "lodash";
import { client } from "client";
/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import styles from "scss/components/AssemblyVideos.module.scss";

export default function Page({}) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const assemblyVideos = useQuery().assemblyVideos()?.nodes;

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
        <title>Assembly Videos - {generalSettings.title}</title>
      </Head>

      <Hero title="Assembly Videos" bgImage="/images/assembly-hero.png" />
      <main className="content content-single">
        <FadeTransition>
          <div className="wrap" style={{ borderBottom: "1px solid black" }}>
            <h3>Assembly Videos</h3>
            {_.chunk(assemblyVideos, 3).map((chunk: any[], chunkIdx: any) => (
              <div key={`row-${chunkIdx}`} className={styles.videos}>
                {chunk.map((video, featureIdx) => (
                  <div className="assembly_video" key={featureIdx}>
                    <h3>{video.title}</h3>
                    <video width="320" height="240" controls>
                      <source
                        src={`${video.video.mediaItemUrl}#t=5`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <section className={styles.explore}>
            <ServiceGrid />
          </section>
        </FadeTransition>
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
