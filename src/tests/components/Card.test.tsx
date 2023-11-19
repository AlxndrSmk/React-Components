import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

import Card from '../../components/Card/Card';
import { cardData } from '../mockData/cardData';
import List from '../../components/List/List';
import { listData } from '../mockData/listData';
import getitemData from '../../services/api/getItemData';

const store = setupStore();

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card {...cardData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    const cardImage = screen.getByAltText('Luke Skywalker');
    expect(cardImage.getAttribute('src')).toBe(cardData.imgSrc);
    expect(cardImage).toBeInTheDocument();
  });

  test('opens the detailed card component when clicking on the card', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pathName/1']}>
          <List {...listData} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(container.innerHTML).toContain('items__right');
    expect(container.innerHTML).toContain('button__close');
  });

  test('triggers an additional API call to fetch detailed information when clicking on the card', async () => {
    const mockFetch = vi.fn();

    render(
      <MemoryRouter initialEntries={['/pathName/1']}>
        <List {...listData} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));

    global.fetch = mockFetch;
    const mockDetailedData = cardData.data;

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({
        mockDetailedData,
      }),
    });

    const data = await getitemData('1', 'people');
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    expect(data).toEqual({
      mockDetailedData,
    });
  });
});
