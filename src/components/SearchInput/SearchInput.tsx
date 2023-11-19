import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchString, setCurrentPage } from '../../store/reducers/listDataSlice';

import './SearchInput.scss';
import { RootState } from '../../store/store';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchString } = useAppSelector((state: RootState) => state.listDataReducer);
  const [inputValue, setInputValue] = useState<string>(searchString);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement)?.value);
  };

  const handleSubmitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(setSearchString(inputValue));
    dispatch(setCurrentPage(1));
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <label>
        <input
          className="form__input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search"
        />
      </label>
      <button className="form__button" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512">
          <path
            d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
            fill="white"
          />
        </svg>{' '}
      </button>
    </form>
  );
};

export default SearchInput;
