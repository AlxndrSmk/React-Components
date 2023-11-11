import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from '../../components/List/List';
import { IListProps } from '../../types/types';
import { listDataMock } from '../mocks/listDataMock';

describe('List component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loader when data is not loaded', () => {
    render(
      <MemoryRouter>
        <List {...listDataMock} isDataLoaded={false} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders list when data is loaded', async () => {
    render(
      <MemoryRouter>
        <List {...listDataMock} isDataLoaded={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates to the correct route when an item is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/pathName/1']}>
        <List {...listDataMock} isDataLoaded={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(container.innerHTML).toContain('items__right');
    expect(container.innerHTML).toContain('button__close');
  });

  test('closes the card when the close button is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/pathName/1']}>
        <List {...listDataMock} isDataLoaded={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(container.innerHTML).toContain('items__right');

    fireEvent.click(screen.getByText('Close'));
    expect(container.innerHTML).toContain('items__right hidden');
  });

  test('displays a message when no cards are present', () => {
    const listDataMockWithoutResults: IListProps = {
      decrementPage: vi.fn(),
      handleSubmit: vi.fn(),
      incrementPage: vi.fn(),
      isDataLoaded: true,
      listData: {
        count: 0,
        next: 'next',
        previous: null,
        results: [],
      },
      pathName: 'mockPath',
      currentPage: 1,
      handleSelectChange: vi.fn(),
      perPage: '5',
    };

    render(
      <MemoryRouter>
        <List {...listDataMockWithoutResults} />
      </MemoryRouter>
    );

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  test('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <List {...listDataMock} isDataLoaded={true} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(listDataMock.listData.count);
  });
});
