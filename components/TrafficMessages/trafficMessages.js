import * as React from "react";
import styles from "../../styles/Home.module.css";
import TrafficMessage from "../TrafficMessage";
import useTrafficMessages from "./hooks";

export default function TrafficMessages({ trafficMessages }) {
  const { data } = useTrafficMessages({
    fallbackData: trafficMessages,
  });

  return (
    <div className={styles.grid}>
      {data?.length > 0 ? (
        data.map((trafficMessage, index) => (
          <TrafficMessage
            key={`${trafficMessage?.title}-${index}`}
            title={trafficMessage?.title}
            createdAt={trafficMessage?.createdAt}
            content={trafficMessage?.content}
          />
        ))
      ) : (
        <div className={styles.card}>
          <h3>No content@@@</h3>
          <h4>Maybe API was killed :(</h4>
          <p>Rip in pepperoni</p>
        </div>
      )}
    </div>
  );
}
