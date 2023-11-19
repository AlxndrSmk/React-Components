import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../routes/router';
import '@testing-library/jest-dom';

describe('NotFound component', () => {
  test('renders when pushing an invalid route', async () => {
    const initialEntries = ['/', '/admin'];
    const router = createMemoryRouter(routerConfig, {
      initialEntries,
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);

    const notFoundTitle = screen.getByRole('heading', { level: 1 });
    expect(notFoundTitle).toBeInTheDocument();

    const notFoundDescription = screen.getByText('You lost your own way');
    expect(notFoundDescription).toBeInTheDocument();

    const backToMainLink = screen.getByRole('link', { name: 'Go to main' });
    expect(backToMainLink).toBeInTheDocument();
    expect(backToMainLink.getAttribute('href')).toBe('/');

    const notFoundImage = screen.getByAltText('Darth Vaider');
    expect(notFoundImage.getAttribute('src')).toBe('/images/png/darth_vader.png');
    expect(notFoundImage).toBeInTheDocument();
  });
});
