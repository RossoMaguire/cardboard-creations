/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import styles from "scss/components/AssemblyVideos.module.scss";
import { client } from "client";
import { Footer, Header, Hero } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import ServiceGrid from "components/ServiceGrid";
import _ from "lodash";

export default function Page({}) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const assemblyVideos = useQuery().assemblyVideos()?.nodes;

  console.log(assemblyVideos);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Assembly Videos - {generalSettings.title}</title>
      </Head>

      <Hero title="Assembly Videos" />

      <main className="content content-single">
        <div className="wrap">
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
