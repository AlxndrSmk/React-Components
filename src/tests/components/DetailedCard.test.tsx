import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Person from '../../components/cards/Person/Person';
import { noDetailedCardData } from '../mockData/noDetailedCardData';
import getItemData from '../../services/api/getItemData';

describe('DetailedCard component', () => {
  test('displays loading indicator while fetching data;', async () => {
    render(<Person />);

    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({
        noDetailedCardData,
      }),
    });

    const personData = await getItemData('1', 'people');
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    expect(personData).toEqual({
      noDetailedCardData,
    });

    const smallLoaderElement = screen.getByTestId('small-loader');
    expect(smallLoaderElement).toBeInTheDocument();
  });
});
