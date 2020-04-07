import React from 'react';
import Labels from './Labels'
import styles from './index.scss';

const Card = (props:any) => {
  const { titleClass, legends, contentClass, title, children } = props;
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={`${styles.title} ${titleClass}`}>{title}</div>
        {legends || null}
      </div>
      <div className={`${styles.content} ${contentClass}`}>{children}</div>
    </div>
  );
};

export {
  Card,
  Labels
};


