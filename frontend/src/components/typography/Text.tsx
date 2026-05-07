import React from 'react';

// Хук для получения ширины окна
function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

interface TextProps {
  children: React.ReactNode;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  color,
  style = {}
}) => {
  const width = useWindowWidth();
  // Дефолтные стили
  const defaultStyles: React.CSSProperties = {
    fontFamily: 'Comfortaa',
    color: '#BBFAE9',
    margin: width < 1224 ? '16px 0 16px 0' : '40px 0 40px 0',
    lineHeight: '1.5',
    fontSize: width < 1224 ? '12px' : '18px' // Меньше на мобильных
  };

  // Объединяем стили с правильным приоритетом:
  const mergedStyles = {
    ...defaultStyles,
    ...style,
    color: color ?? defaultStyles.color, // Используем ?? для null/undefined
    fontSize: size
      ? typeof size === 'number'
        ? width < 1224
          ? `${Math.round(Number(size) * 0.7)}px`
          : `${size}px`
        : size
      : defaultStyles.fontSize
  };

  return <span style={mergedStyles}>{children}</span>;
};
