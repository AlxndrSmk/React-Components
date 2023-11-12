import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Specie from '../../../components/cards/Specie/Specie';

describe('Specie component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Specie />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
