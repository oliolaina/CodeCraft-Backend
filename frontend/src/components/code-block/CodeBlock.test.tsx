import { render, screen } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('renders code and language', () => {
    render(<CodeBlock code="console.log('test')" language='js' />);
    expect(screen.getByText('js')).toBeInTheDocument();
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });
});
