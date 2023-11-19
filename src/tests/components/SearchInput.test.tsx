import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchInput from '../../components/SearchInput/SearchInput';

describe('SearchInput component', () => {
  test('renders search field correctly', () => {
    render(<SearchInput searchString="" />);

    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeInTheDocument();
  });

  test('renders search button correctly', () => {
    render(<SearchInput searchString="" />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  test('saves the entered value to the local storage when clicking the Search button', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    afterEach(() => {
      localStorage.clear();
      setItemSpy.mockClear();
    });

    render(<SearchInput searchString="" />);

    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: 'test' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    const savedValue = localStorage.getItem('inputValue');
    expect(savedValue).toBe('test');
    expect(setItemSpy).toHaveBeenCalledWith('inputValue', 'test');
  });
});
