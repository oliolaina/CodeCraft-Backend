import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders heading', () => {
    render(
      <Heading size={2} color='#000'>
        Heading text
      </Heading>
    );
    expect(screen.getByText('Heading text')).toBeInTheDocument();
  });
});
