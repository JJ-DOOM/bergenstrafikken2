import * as React from "react";
import styles from "../../styles/Home.module.css";

export default function TrafficMessage({ title, createdAt, content = [] }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <h4>{createdAt}</h4>
      {content?.map((tmc, index) => (
        <p key={index}>{tmc}</p>
      ))}
    </div>
  );
}
