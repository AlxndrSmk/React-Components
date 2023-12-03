import { useState } from 'react';
import styles from './ControlledAutocomplete.module.scss';
import { ControlledAutocompleteProps } from '../../types/types';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

const ControlledAutocomplete: React.FC<ControlledAutocompleteProps> = (props) => {
  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);
  const countries = useAppSelector((state: RootState) => state.countries.countryList);

  const {
    register,
    setValue,
    setCountriesFilteredVisible,
    trigger,
    watchCountry,
    error,
    countriesFilteredVisible,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      countries.filter((country) =>
        country.toLowerCase().startsWith(e.target.value?.toLowerCase() || '')
      )
    );
  };

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor="country">Country: *</label>
      <div className={styles.wrapper}>
        <input
          type="text"
          id="country"
          {...register('country')}
          onChange={(e) => {
            register('country').onChange(e);
            handleChange(e);
          }}
        />
        {countriesFilteredVisible &&
          watchCountry &&
          countriesFiltered.map((country) => (
            <label
              className={styles.countryLabel}
              htmlFor="country"
              key={country}
              onClick={() => {
                setValue('country', country);
                setCountriesFiltered([]);
                trigger('country');
              }}
            >
              {country}
            </label>
          ))}
        <span className={styles.error}>{error ? error : ''}</span>
      </div>
    </fieldset>
  );
};

export default ControlledAutocomplete;
