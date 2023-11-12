import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
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

    const smallLoaderElement = screen.getByTestId('small-loader');
    expect(smallLoaderElement).toBeInTheDocument();
  });

  test('correctly displays the detailed card data', async () => {});

  test('hides the component when the close button is clicked', () => {
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
});
