import * as React from "react";
import styles from "../../styles/Home.module.css";

export default function TrafficMessage({ title, createdAt, content = [] }) {
  const getContent = (item, index) => {
    const { type, value } = item;
    switch (type) {
      case "text":
        return <p key={index}>{value}</p>;
      case "list":
        return (
          <React.Fragment key={index}>
            {value?.map((tmc, index) => (
              <p key={index}>{`- ${tmc.value}`}</p>
            ))}
          </React.Fragment>
        );
      case "embed-code":
        return <div className={styles.embed} dangerouslySetInnerHTML={{ __html: value }} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      <h4>{createdAt}</h4>
      <h3>{title}</h3>
      {content?.map((item, index) => getContent(item, index))}
    </div>
  );
}
