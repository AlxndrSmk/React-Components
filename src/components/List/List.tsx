import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import SearchInput from '../SearchInput/SearchInput';
import './List.scss';
import { IFilmData, IListProps, TAllCardsDataWithName } from '../../types/types';
import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../Card/Card';

const List: React.FC<IListProps> = ({
  decrementPage,
  handleSubmit,
  incrementPage,
  pathName,
  currentPage,
  handleSelectChange,
  perPage,
  searchString,
  listData,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsOpen(true);
    }
  }, [id]);

  const closeCard = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const handleLeftClick = () => {
    if (isOpen) {
      setIsOpen(false);
      navigate(-1);
    }
  };

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSelectChange((event.target as HTMLSelectElement).value);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return (
      <div className="list__wrapper" data-testid="list">
        <div
          className={`${isOpen ? 'items__left disabled' : 'items__left'}`}
          onClick={handleLeftClick}
          data-testid="items__left"
        >
          <div className="inputs__wrapper">
            <SearchInput searchString={searchString} handleSubmit={handleSubmit} />
            <div className="custom-select">
              <select onChange={selectChange} value={perPage}>
                <option value="5">5 items</option>
                <option value="10">10 items</option>
              </select>
            </div>
          </div>
          <div className="items__wrapper">
            {listData?.results?.length ? (
              listData.results?.slice(0, +perPage).map((data) => {
                const listId: string = data.url.replace(/[^0-9]/g, '');
                const imgSrc = `/images/${pathName.split('/')[0]}/${listId}.jpg`;
                const path = `/${pathName}/${data.url.replace(
                  /[^0-9]/g,
                  ''
                )}?search=${searchString}&page=${currentPage}&per_page=${perPage}`;

                return (
                  <Card
                    key={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                    data={data}
                    imgSrc={imgSrc}
                    path={path}
                  />
                );
              })
            ) : (
              <div className="no-data-found" data-testid="not-found">
                No data found
              </div>
            )}
          </div>
          <div className="buttons">
            <button className="button" onClick={decrementPage} disabled={!listData?.previous}>
              Prev
            </button>
            <div data-testid="pageNumber" className="pageNumber">
              {currentPage}
            </div>
            <button className="button" onClick={incrementPage} disabled={!listData?.next}>
              Next
            </button>
          </div>
        </div>
        <div className={`${isOpen ? 'items__right' : 'items__right hidden'}`}>
          <button className="button button__close" onClick={closeCard}>
            Close
          </button>
          <Outlet />
        </div>
      </div>
    );
  }

  return null;
};

export default List;
