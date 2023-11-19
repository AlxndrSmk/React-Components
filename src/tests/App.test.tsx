import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import App from '../App';
import { MemoryRouter } from 'react-router';

const store = setupStore();

describe('App component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeDefined();
  });
});
