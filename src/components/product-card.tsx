import { FC } from 'react';
import styles from './card.module.css';

import { Product } from 'types';

export const Card: FC<Product> = ({ title, thumbnail }) => {
  return (
    <div className={styles.container}>
      <img src={thumbnail} alt={thumbnail} className={styles.img} loading='lazy' />
      <p className={styles.title} title={title}>
        {title}
      </p>
    </div>
  );
};
