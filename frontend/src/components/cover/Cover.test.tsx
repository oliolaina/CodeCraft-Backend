import { render, screen } from '@testing-library/react';
import { Cover } from './Cover';

describe('Cover', () => {
  it('renders button and icons', () => {
    render(
      <Cover
        onStart={() => {}}
        onCppClick={() => {}}
        onPythonClick={() => {}}
        backgroundUrl='test.png'
      />
    );
    expect(screen.getByText('Начать изучение')).toBeInTheDocument();
    expect(screen.getByAltText('python')).toBeInTheDocument();
    expect(screen.getByAltText('c++')).toBeInTheDocument();
  });
});
