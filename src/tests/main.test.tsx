import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from '../routes/router';
import { setupStore } from '../store/store';

test('renders page with Provider and RouterProvider', () => {
  const store = setupStore();

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  expect(screen.getByText('© 2023 Alexander Samak'));
});
