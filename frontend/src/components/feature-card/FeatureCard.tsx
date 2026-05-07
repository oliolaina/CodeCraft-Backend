import React from 'react';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  text: string;
  background?: string; // CSS background (color/gradient)
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  text,
  background
}) => (
  <div className={styles.card} style={background ? { background } : {}}>
    <div className={styles.title}>{title}</div>
    <div className={styles.text}>{text}</div>
  </div>
);
