import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';

test('SearchInput field should render correctly', () => {
  render(<SearchInput handleSubmit={(): void => {}} />);

  const inputField = screen.getByRole('textbox');
  expect(inputField).toBeInTheDocument();
});

test('SearchInput button should render correctly', () => {
  render(<SearchInput handleSubmit={(): void => {}} />);

  const submitButton = screen.getByRole('button');
  expect(submitButton).toBeInTheDocument();
});
