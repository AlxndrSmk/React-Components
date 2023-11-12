import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Film from '../../../components/cards/Film/Film';

describe('Film component', () => {
  test('displays loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Film />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
