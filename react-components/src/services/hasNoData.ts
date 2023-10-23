const hasNoData = (value) => {
  return (
    value === 'unknown' ||
    value === '0' ||
    value.toUpperCase() === 'N/A' ||
    value === 'none' ||
    false
  );
};

export default hasNoData;
