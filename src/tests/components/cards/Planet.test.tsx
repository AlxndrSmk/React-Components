import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Planet from '../../../components/cards/Planet/Planet';

describe('Planet component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Planet />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
