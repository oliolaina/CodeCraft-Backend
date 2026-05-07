import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset'; // стандартный HTML-атрибут type
  sizeType?: 'default' | 'little'; // кастомный тип для размеров
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  htmlType = 'button',
  sizeType = 'default'
}) => {
  // Формируем список классов
  const buttonClasses = [
    styles.button,
    sizeType === 'little' ? styles.button_little : ''
  ]
    .join(' ')
    .trim();

  return (
    <button className={buttonClasses} onClick={onClick} type={htmlType}>
      {label}
    </button>
  );
};
