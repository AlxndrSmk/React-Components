import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router';

describe('App component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(container).toBeDefined();
  });
});
