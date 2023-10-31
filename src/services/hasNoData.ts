const hasNoData = (value: string | undefined): boolean => {
  const knownNoDataValues = ['unknown', '0', 'N/A', 'none'];
  return !!value && knownNoDataValues.includes(value);
};

export default hasNoData;
