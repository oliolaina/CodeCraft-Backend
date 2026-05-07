import React from 'react';
import styles from './CoverIcons.module.css';

interface CoverIcon {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface CoverIconsProps {
  icons: CoverIcon[];
}

export const CoverIcons: React.FC<CoverIconsProps> = ({ icons }) => (
  <div className={styles.icons}>
    {icons.map((icon, idx) => (
      <button
        key={icon.label}
        className={styles.iconBtn}
        onClick={icon.onClick}
        aria-label={icon.label}
      >
        {icon.icon}
      </button>
    ))}
  </div>
);
