import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header', () => {
  it('renders logo and links', () => {
    render(
      <MemoryRouter>
        <Header
          links={[{ label: 'Home', to: '/' }]}
          profileLink={{ label: 'Profile', to: '/profile' }}
          logoText='TestLogo'
        />
      </MemoryRouter>
    );
    expect(screen.getByText('TestLogo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
