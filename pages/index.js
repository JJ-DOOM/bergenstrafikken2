import Head from "next/head";
import styles from "../styles/Home.module.css";
import trafficService from "../services/trafficService";
import * as React from "react";
import { TrafficMessages, useTrafficMessages } from "../components";

export default function Home({ initialTrafficMessages }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trafikkmeldinger i Bergen</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Når BT forræder oss med abonnenttvang, snekrer vi selv" />
        <meta property="og:url" content="https://bergenstrafikken.vercel.app" />
        <meta property="og:title" content="Trafikkmeldinger i Bergen - uten mellommannen" />
        <meta property="og:description" content="Når BT forræder oss med abonnenttvang, snekrer vi selv" />
        <meta property="og:image" content="/asd.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lokale trafikkmeldinger</h1>

        <p className={styles.description}>levert på ekspertlig vis</p>

        <TrafficMessages initialTrafficMessages={initialTrafficMessages} />
      </main>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  return {
    props: {
      initialTrafficMessages: await trafficService.getTrafficMessages(),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
