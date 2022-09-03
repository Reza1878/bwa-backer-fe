import React from "react";
import styles from "./styles.module.css";

interface LoadingIndicatorProps {
  color: "string";
  width: number;
  height: number;
  borderWidth: number;
}

function LoadingIndicator(props: Partial<LoadingIndicatorProps>) {
  const { width = 24, height = 24, borderWidth = 4, color = "black" } = props;
  return (
    <div className={styles.ring}>
      <div
        style={{
          width,
          height,
          color,
          borderColor: `${color} transparent transparent transparent`,
          borderWidth,
        }}
      ></div>
      <div
        style={{
          width,
          height,
          color,
          borderColor: `${color} transparent transparent transparent`,
          borderWidth,
        }}
      ></div>
      <div
        style={{
          width,
          height,
          color,
          borderColor: `${color} transparent transparent transparent`,
          borderWidth,
        }}
      ></div>
      <div
        style={{
          width,
          height,
          color,
          borderColor: `${color} transparent transparent transparent`,
          borderWidth,
        }}
      ></div>
    </div>
  );
}

export default LoadingIndicator;
