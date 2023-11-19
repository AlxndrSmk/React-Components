import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

import Person from '../../components/cards/Person/Person';

const store = setupStore();

describe('DetailedCard component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading indicator while fetching data', () => {
    render(
      <Provider store={store}>
        <Person />
      </Provider>
    );

    const smallLoader = screen.getByTestId('small-loader');
    expect(smallLoader).toBeInTheDocument();
  });
});
