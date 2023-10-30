const dateFormat = (value: string) => {
  const timestamp = Date.parse(value);
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
};

export default dateFormat;
