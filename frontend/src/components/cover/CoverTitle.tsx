import React from 'react';
import styles from './CoverTitle.module.css';

interface CoverTitleProps {
  title: string;
  subtitle: string;
}

export const CoverTitle: React.FC<CoverTitleProps> = ({ title, subtitle }) => (
  <div className={styles.coverTitle}>
    <h1 className={styles.title}>{title}</h1>
    <h2 className={styles.subtitle}>{subtitle}</h2>
  </div>
);
