import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  icon: React.ReactNode;
  title: string;
  percent: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  icon,
  title,
  percent
}) => (
  <div className={styles.wrapper}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{ width: `${Math.max(0, Math.min(percent, 100))}%` }}
        />
      </div>
      <div className={styles.percent}>{percent}%</div>
    </div>
  </div>
);
