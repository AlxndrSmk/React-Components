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

    const smallLoader = screen.getByTestId('small-loader');
    expect(smallLoader).toBeInTheDocument();
  });

  // test('correctly displays the detailed card data', async () => {
  //   const mockDetailedCardData = cardData.data;
  //   nock('https://swapi.dev/api')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //     })
  //     .get('/people/1')
  //     .reply(200, mockDetailedCardData);

  //   const mockPlanetData = {
  //     name: 'Tatooine',
  //     rotation_period: '23',
  //     orbital_period: '304',
  //     diameter: '10465',
  //     climate: 'arid',
  //     gravity: '1 standard',
  //     terrain: 'desert',
  //     surface_water: '1',
  //     population: '200000',
  //     residents: [
  //       'https://swapi.dev/api/people/1/',
  //       'https://swapi.dev/api/people/2/',
  //       'https://swapi.dev/api/people/4/',
  //       'https://swapi.dev/api/people/6/',
  //       'https://swapi.dev/api/people/7/',
  //       'https://swapi.dev/api/people/8/',
  //       'https://swapi.dev/api/people/9/',
  //       'https://swapi.dev/api/people/11/',
  //       'https://swapi.dev/api/people/43/',
  //       'https://swapi.dev/api/people/62/',
  //     ],
  //     films: [
  //       'https://swapi.dev/api/films/1/',
  //       'https://swapi.dev/api/films/3/',
  //       'https://swapi.dev/api/films/4/',
  //       'https://swapi.dev/api/films/5/',
  //       'https://swapi.dev/api/films/6/',
  //     ],
  //     created: '2014-12-09T13:50:49.641000Z',
  //     edited: '2014-12-20T20:58:18.411000Z',
  //     url: 'https://swapi.dev/api/planets/1/',
  //   };
  //   nock('https://swapi.dev/api')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //     })
  //     .get('/planets/1')
  //     .reply(200, mockPlanetData);

  //   const mockSpecieData = undefined;
  //   nock('https://swapi.dev/api')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //     })
  //     .get('/species/undefined')
  //     .reply(200, mockSpecieData);

  //   render(<Person />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  //   });
  // });

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
