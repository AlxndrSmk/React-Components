import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

import List from '../../components/List/List';
import { listData } from '../mockData/listData';
import { emptyListData } from '../mockData/emptyListData';

const store = setupStore();

describe('List component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loader when data is not loaded', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List {...listData} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders list when data is loaded', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List {...listData} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('displays appropriate message is if no cards are present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List {...emptyListData} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
