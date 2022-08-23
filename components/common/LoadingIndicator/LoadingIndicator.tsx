import React from "react";
import styles from "./styles.module.css";

function LoadingIndicator() {
  return (
    <div className={styles.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
