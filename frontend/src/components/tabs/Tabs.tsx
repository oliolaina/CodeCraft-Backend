import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  children
}) => (
  <div className={styles.tabsWrap}>
    <div className={styles.tabsBar}>
      {items.map((item) => (
        <button
          key={item.value}
          className={
            value === item.value
              ? `${styles.tabBtn} ${styles.active}`
              : styles.tabBtn
          }
          onClick={() => onChange(item.value)}
          aria-label={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
    <div className={styles.tabContent}>{children}</div>
  </div>
);
