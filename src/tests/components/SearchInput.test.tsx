import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchInput from '../../components/SearchInput/SearchInput';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

const store = setupStore();

describe('SearchInput component', () => {
  test('renders search field correctly', () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const inputField = screen.getByRole('textbox');
    console.log(inputField);
    expect(inputField).toBeInTheDocument();
  });

  test('renders search button correctly', () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });
});
