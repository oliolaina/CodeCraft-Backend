import { render, screen } from '@testing-library/react';
import { BlogCard } from './BlogCard';

describe('BlogCard', () => {
  it('renders title and description', () => {
    render(
      <BlogCard
        title='Test title'
        description='Test desc'
        image='test.png'
        to='/test'
      />
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test desc')).toBeInTheDocument();
  });
});
