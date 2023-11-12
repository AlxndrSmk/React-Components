import hasNoData from '../../services/hasNoData';

describe('hasNoData', () => {
  it('should return true for known no-data values', () => {
    const knownNoDataValues = ['unknown', '0', 'none', 'n/a'];

    for (const value of knownNoDataValues) {
      expect(hasNoData(value)).toBe(true);
    }
  });

  it('should return false for non-no-data values', () => {
    const nonNoDataValues = ['abc', '123', 'true', 'false'];

    for (const value of nonNoDataValues) {
      expect(hasNoData(value)).toBe(false);
    }
  });

  it('should return false for undefined values', () => {
    expect(hasNoData(undefined)).toBe(false);
  });
});
