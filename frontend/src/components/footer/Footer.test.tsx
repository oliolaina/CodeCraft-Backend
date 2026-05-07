import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders logoText and copyright', () => {
    render(<Footer logoText='TestLogo' copyright='2025' />);
    expect(screen.getByText('TestLogo')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });
});
