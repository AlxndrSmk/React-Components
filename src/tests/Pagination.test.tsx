import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { screen } from '@testing-library/react';

const ElementToRender: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/people/search=&page=2&per_page=10')}>
      Navigate to Next page
    </button>
  );
};

const setupMyTest = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/people/search=&page=1&per_page=10',
        element: <>Navigated from Start</>,
      },
      {
        path: '/people/search=&page=2&per_page=10',
        element: <ElementToRender />,
      },
    ],
    {
      initialEntries: ['/people/search=&page=2&per_page=10'],
      initialIndex: 0,
    }
  );

  render(<RouterProvider router={router} />);

  return { router };
};

describe('Pagination', () => {
  it('updates URL query parameter when page changes.', async () => {
    const { router } = setupMyTest();
    expect(router.state.location.pathname).toEqual('/people/search=&page=2&per_page=10');

    userEvent.click(screen.getByRole('button', { name: 'Navigate to Next page' }));
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/people/search=&page=2&per_page=10');
    });
  });
});
