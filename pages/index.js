import Head from "next/head";
import styles from "../styles/Home.module.css";
import { API_URL } from "../constants";

export default function Home({ trafficMessages = [] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bergenstrafikken</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lokale trafikkmeldinger</h1>

        <p className={styles.description}>levert på ekspertlig vis</p>

        <div className={styles.grid}>
          {trafficMessages.length > 0 ? (
            trafficMessages.map((tm, index) => (
              <div key={`${tm?.title}-${index}`} className={styles.card}>
                <h3>{tm?.title}</h3>
                <h4>{tm?.createdAt}</h4>
                {tm?.content?.map((tmc, index) => (
                  <p key={index}>{tmc}</p>
                ))}
              </div>
            ))
          ) : (
            <div className={styles.card}>
              <h3>No content@@@</h3>
              <h4>Maybe API was killed :(</h4>
              <p>Rip in pepperoni</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch(API_URL);
  const trafficMessagesRaw = await res.json();

  const trafficMessages = {
    trafficMessages: trafficMessagesRaw.map((tm) => ({
      title: tm?.title,
      createdAt: tm?.createdAt,
      content: tm?.content?.components?.map((tmc) => (tmc?.type === "text" ? tmc?.value : null)),
    })),
  };

  return {
    props: trafficMessages,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
