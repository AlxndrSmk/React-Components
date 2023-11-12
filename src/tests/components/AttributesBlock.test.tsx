import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AttributesBlock from '../../components/AttributesBlock/AttributesBlock';

describe('AttributesBlock component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <AttributesBlock
        data={['https://swapi.dev/api/vehicles/1', 'https://swapi.dev/api/vehicles/1']}
        title={'Vehicles'}
        classNames={[]}
      />
    );

    const smallLoader = screen.getByTestId('small-loader');
    expect(smallLoader).toBeInTheDocument();
  });
});
