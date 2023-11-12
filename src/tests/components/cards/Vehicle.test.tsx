import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Vehicle from '../../../components/cards/Vehicle/Vehicle';

describe('Vehicle component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Vehicle />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
