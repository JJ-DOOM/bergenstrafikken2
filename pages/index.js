import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import trafficService from "../services/trafficService";
import Bus from "../public/svgs/bus.svg";
import Car from "../public/svgs/car.svg";
import Train from "../public/svgs/train.svg";
import { TrafficMessages } from "../components";

export default function Home({ trafficMessages }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trafikkmeldinger i Bergen</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Source_Sans_Pro/SourceSansPro-SemiBold.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf" as="font" crossOrigin="" />
        <meta name="description" content="Abonnementstvang --> ikke vær så vrang." />
        <meta property="og:url" content="https://bergenstrafikken.vercel.app" />
        <meta property="og:title" content="Trafikkmeldinger i Bergen - uten mellommannen" />
        <meta property="og:description" content="Abonnementstvang --> ikke vær så vrang." />
        <meta property="og:image" content="/asd.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.banner}>(Nesten) alltid oppdatert</div>
        <div className={styles.icons}>
          <Car />
          <Bus className={styles.mobileHidden} />
          <Train className={styles.mobileHidden} />
        </div>
        <h1 className={styles.title}>Lokale trafikkmeldinger</h1>
        <p className={styles.description}>levert på ekspertlig vis</p>

        <TrafficMessages trafficMessages={trafficMessages} />
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
      trafficMessages: await trafficService.getTrafficMessages(),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
