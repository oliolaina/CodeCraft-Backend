import React from 'react';
import { CoverBackground } from './CoverBackground';
import { CoverTitle } from './CoverTitle';
import { CoverIcons } from './CoverIcons';
import { Button } from '../button';
import python_logo from '../../assets/images/python_logo.png';
import cpp_logo from '../../assets/images/cpp_logo.png';

interface CoverProps {
  onStart: () => void;
  onCppClick: () => void;
  onPythonClick: () => void;
  backgroundUrl: string;
}

export const Cover: React.FC<CoverProps> = ({
  onStart,
  onCppClick,
  onPythonClick,
  backgroundUrl
}) => (
  <CoverBackground imageUrl={backgroundUrl}>
    <CoverTitle title='CodeCraft' subtitle='Код - это искусство' />
    <CoverIcons
      icons={[
        {
          icon: <img src={python_logo} alt='python' />,
          label: 'Python',
          onClick: onPythonClick
        },
        {
          icon: <img src={cpp_logo} alt='c++' />,
          label: 'C++',
          onClick: onCppClick
        }
      ]}
    />
    <Button label='Начать изучение' onClick={onStart} />
  </CoverBackground>
);
