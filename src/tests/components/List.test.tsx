import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from '../../components/List/List';
import { listData } from '../mockData/listData';
import { emptyListData } from '../mockData/emptyListData';

describe('List component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loader when data is not loaded', () => {
    render(
      <MemoryRouter>
        <List {...listData} isDataLoaded={false} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders list when data is loaded', async () => {
    render(
      <MemoryRouter>
        <List {...listData} isDataLoaded={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates to the correct route when an item is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/pathName/1']}>
        <List {...listData} isDataLoaded={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(container.innerHTML).toContain('items__right');
    expect(container.innerHTML).toContain('button__close');
  });

  test('closes the card when the close button is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/pathName/1']}>
        <List {...listData} isDataLoaded={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(container.innerHTML).toContain('items__right');

    fireEvent.click(screen.getByText('Close'));
    expect(container.innerHTML).toContain('items__right hidden');
  });

  test('displays appropriate message is if no cards are present', () => {
    render(
      <MemoryRouter>
        <List {...emptyListData} />
      </MemoryRouter>
    );

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  test('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <List {...listData} isDataLoaded={true} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(Number(listData.perPage));
  });
});
