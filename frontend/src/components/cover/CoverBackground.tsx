import React from 'react';
import styles from './CoverBackground.module.css';

interface CoverBackgroundProps {
  imageUrl: string;
  children?: React.ReactNode;
}

export const CoverBackground: React.FC<CoverBackgroundProps> = ({
  imageUrl,
  children
}) => (
  <div
    className={styles.background}
    //style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <img src={imageUrl} className={styles.image} />
    {children}
  </div>
);
