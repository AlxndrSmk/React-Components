import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchInput from '../../components/SearchInput/SearchInput';

describe('SearchInput component', () => {
  test('renders search field correctly', () => {
    render(<SearchInput handleSubmit={(): void => {}} />);

    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeInTheDocument();
  });

  test('renders search button correctly', () => {
    render(<SearchInput handleSubmit={(): void => {}} />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });
});
