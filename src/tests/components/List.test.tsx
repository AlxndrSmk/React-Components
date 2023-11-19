import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

import List from '../../components/List/List';
import { listPropsMock } from '../mocks/listPropsMock';
import { server } from '../server';

const store = setupStore();

describe('List component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('renders loader when data is not loaded', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List {...listPropsMock} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders list when data is loaded', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List {...listPropsMock} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('R2-D2')).toBeInTheDocument();
    });
  });
});
