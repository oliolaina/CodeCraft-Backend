import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders icon, title, and percent', () => {
    render(
      <ProgressBar icon={<span>icon</span>} title='Test title' percent={42} />
    );
    expect(screen.getByText('icon')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();
  });
});
