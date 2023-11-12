const hasNoData = (value: string | undefined): boolean => {
  const knownNoDataValues = ['unknown', '0', 'none', 'n/a'];
  return !!value && knownNoDataValues.includes(value.toLowerCase());
};

export default hasNoData;
