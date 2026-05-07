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

interface HeadingProps {
  children: React.ReactNode;
  size?: number; // 1-6
  color?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  size = 1,
  color,
  style = {}
}) => {
  const width = useWindowWidth();
  const Tag =
    `h${Math.min(6, Math.max(1, size))}` as keyof JSX.IntrinsicElements;

  // Дефолтные стили
  const defaultStyles: React.CSSProperties = {
    color: '#00f0b1',
    margin: width < 1224 ? '12px 0 12px 0' : '32px 0 32px 0',
    fontSize: width < 1224 ? '18px' : '36px',
    fontFamily: 'monospace'
  };

  // Объединяем стили: дефолтные < переданные в пропсе style < переданные отдельно (color)
  const mergedStyles = {
    ...defaultStyles,
    ...style,
    color: color || defaultStyles.color
  };

  return <Tag style={mergedStyles}>{children}</Tag>;
};
