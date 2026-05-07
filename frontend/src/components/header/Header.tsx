import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import '../../assets/fonts/fonts.css';

export interface NavLink {
  label: string;
  to: string;
}

interface HeaderProps {
  links: NavLink[];
  profileLink: NavLink;
  logoText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  links,
  profileLink,
  logoText = 'CodeCraft'
}) => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <img src={logo} className={styles.logo} alt='logo' />
      {logoText}
    </div>
    <nav className={styles.nav}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={styles.link}>
          {link.label}
        </Link>
      ))}
    </nav>
    <Link to={profileLink.to} className={styles.profile}>
      {profileLink.label}
    </Link>
  </header>
);
