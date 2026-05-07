import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  logoText?: string;
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logoText = 'CodeCraft',
  copyright = 'Баймуратова Алина, 2025-2026'
}) => (
  <footer className={styles.footer}>
    <div className={styles.logo}>{logoText}</div>
    <div className={styles.copyright}>{copyright}</div>
  </footer>
);
