import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders text', () => {
    render(
      <Text size={18} color='#000'>
        Sample text
      </Text>
    );
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });
});
