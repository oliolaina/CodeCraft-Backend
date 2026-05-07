import { render, screen } from '@testing-library/react';
import { LessonCard } from './LessonCard';

describe('LessonCard', () => {
  it('renders title, level, and description', () => {
    render(
      <LessonCard
        title='Test Lesson'
        level='easy'
        language='python'
        description='Test desc'
        background='#fff'
        to='/lesson'
      />
    );
    expect(screen.getByText('Test Lesson')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
    expect(screen.getByText('Test desc')).toBeInTheDocument();
  });
});
