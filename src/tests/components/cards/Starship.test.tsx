import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Starship from '../../../components/cards/Starship/Starship';

describe('Starship component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Starship />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
