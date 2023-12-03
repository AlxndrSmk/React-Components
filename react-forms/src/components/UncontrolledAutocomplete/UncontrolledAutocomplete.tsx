import { useState } from 'react';
import { COUNTRIES } from '../../constatns/countries';

import styles from '../ControlledAutocomplete/ControlledAutocomplete.module.scss';
import { UncontrolledAutocompleteProps } from '../../types/types';

const UncontrolledAutocomplete: React.FC<UncontrolledAutocompleteProps> = (props) => {
  const { inputRef, isVisible, setIsVisible, error } = props;

  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = () => {
    setIsVisible(true);
    setCountriesFiltered(
      COUNTRIES.filter((country) =>
        country.toLowerCase().startsWith(inputRef.current?.value?.toLowerCase() || '')
      )
    );
  };

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor="country">Country:</label>
      <div className={styles.wrapper}>
        <input type="text" id="country" ref={inputRef} onChange={handleChange} />
        {isVisible &&
          countriesFiltered.map((country) => (
            <label
              htmlFor="country"
              key={country}
              className={styles.countryLabel}
              onClick={() => {
                if (inputRef.current) inputRef.current.value = country;
                setCountriesFiltered([]);
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

export default UncontrolledAutocomplete;
