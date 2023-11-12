import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchInput from '../../components/SearchInput/SearchInput';

describe('SearchInput component', () => {
  test('renders search field correctly', () => {
    render(<SearchInput handleSubmit={(): void => {}} />);

    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeInTheDocument();
  });

  test('renders search button correctly', () => {
    render(<SearchInput handleSubmit={(): void => {}} />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  test('saves the entered value to the local storage when clicking the Search button', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    afterEach(() => {
      localStorage.clear();
      setItemSpy.mockClear();
    });

    render(
      <SearchInput
        handleSubmit={(value): void => {
          localStorage.setItem('inputValue', value);
        }}
      />
    );

    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: 'test' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    const savedValue = localStorage.getItem('inputValue');
    expect(savedValue).toBe('test');
    expect(setItemSpy).toHaveBeenCalledWith('inputValue', 'test');
  });

  test('retrieves the value from local storage upon mounting', () => {
    const localStorageMock = {
      getItem: vi.fn(),
      clear: vi.fn(),
    };

    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'inputValue') {
        return 'test';
      }
      return null;
    });

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });

    render(<SearchInput handleSubmit={(): void => {}} />);

    const inputField = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputField.value).toBe('test');

    expect(localStorageMock.getItem.mock.calls[0][0]).toBe('inputValue');
  });
});
