import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('renders tab label and content', () => {
    render(
      <Tabs
        items={[{ icon: <span>i</span>, label: 'Tab1', value: 'tab1' }]}
        value='tab1'
        onChange={() => {}}
      >
        <div>Tab content</div>
      </Tabs>
    );

    // Ищем кнопку по aria-label вместо текста
    expect(screen.getByRole('button', { name: 'Tab1' })).toBeInTheDocument();
    expect(screen.getByText('Tab content')).toBeInTheDocument();
  });
});
