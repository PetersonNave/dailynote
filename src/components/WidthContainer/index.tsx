import React from "react";
import styles from "./widthContainer.module.scss";

const WidthContainer = ({ children, stylesInline, containerStyles }: { children: any, stylesInline?: React.CSSProperties, containerStyles?: React.CSSProperties  }) => {
  return (
    <section style={stylesInline} className={styles.widthContainerSection}>
      <div style={containerStyles} className={styles.widthContainerContainer}>{children}</div>
    </section>
  );
};

export default WidthContainer;
