import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard', () => {
  it('renders title and text', () => {
    render(
      <FeatureCard title='Test title' text='Test text' background='#fff' />
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });
});
