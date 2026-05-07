import React from 'react';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  title: string;
  description: string;
  image: string; // url
  to: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  to
}) => (
  <a className={styles.card} href={to} target='_blank'>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </a>
);
