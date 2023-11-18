import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

import Person from '../../components/cards/Person/Person';
import { MemoryRouter } from 'react-router';
import List from '../../components/List/List';
import { listData } from '../mockData/listData';

describe('DetailedCard component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading indicator while fetching data', () => {
    render(<Person />);

    const smallLoader = screen.getByTestId('small-loader');
    expect(smallLoader).toBeInTheDocument();
  });

  test('hides the component when the close button is clicked', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pathName/1']}>
          <List {...listData} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(container.innerHTML).toContain('items__right');

    fireEvent.click(screen.getByText('Close'));
    expect(container.innerHTML).toContain('items__right hidden');
  });
});
