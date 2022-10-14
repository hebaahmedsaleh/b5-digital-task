import { FC } from 'react';
import styles from './card.module.css';

interface Photo {
  albumId: number;
  title: string;
  id: number;
  url: string;
  thumbnailUrl: string;
}

export const Card: FC<Photo> = ({ title, url, thumbnailUrl }) => {
  return (
    <div className={styles.container}>
      <img src={url} alt={thumbnailUrl} className={styles.img} loading='lazy' />
      <p className={styles.title} title={title}>
        {title}
      </p>
    </div>
  );
};
