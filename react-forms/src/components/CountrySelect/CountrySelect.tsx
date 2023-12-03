import { useState } from 'react';
import { COUNTRIES } from '../../constatns/countries';
import styles from './CountrySelect.module.scss';
import { Register, SetValue, Trigger } from '../../types/types';

interface CountrySelectProps {
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: Register;
  setValue: SetValue;
  trigger: Trigger;
  countriesFilteredVisible: boolean;
  watchCountry: string | undefined;
  error: string | undefined;
}

const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const {
    register,
    setValue,
    setCountriesFilteredVisible,
    trigger,
    watchCountry,
    error,
    countriesFilteredVisible,
  } = props;

  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      COUNTRIES.filter((country) =>
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

export default CountrySelect;
