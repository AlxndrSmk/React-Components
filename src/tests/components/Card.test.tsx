import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

import Card from '../../components/Card/Card';
import { cardData } from '../mockData/cardData';
import List from '../../components/List/List';
import { listData } from '../mockData/listData';

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
});
