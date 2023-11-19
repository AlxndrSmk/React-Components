import dateFormat from '../../services/dateFormat';

it('should format a date string to a long date string', () => {
  const dateString = '2023-11-12';
  const expectedFormattedDate = 'Sunday, November 12, 2023';

  const actualFormattedDate = dateFormat(dateString);

  expect(actualFormattedDate).toBe(expectedFormattedDate);
});
