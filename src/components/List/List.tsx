import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import SearchInput from '../SearchInput/SearchInput';
import './List.scss';
import { IFilmData, IListProps, TAllCardsDataWithName } from '../../types/types';
import { ChangeEvent, useEffect, useState } from 'react';

const List: React.FC<IListProps> = ({
  decrementPage,
  handleSubmit,
  incrementPage,
  isDataLoaded,
  listData,
  pathName,
  currentPage,
  handleSelectChange,
  perPage,
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

  if (!isDataLoaded) {
    return <Loader />;
  }

  if (isDataLoaded) {
    return (
      <div className="list__wrapper" data-testid="list">
        <div
          className={`${isOpen ? 'items__left disabled' : 'items__left'}`}
          onClick={handleLeftClick}
          data-testid="items__left"
        >
          <div className="inputs__wrapper">
            <SearchInput handleSubmit={handleSubmit} />
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
                return (
                  <Link
                    key={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                    to={`/${pathName}/${data.url.replace(/[^0-9]/g, '')}`}
                    className="item__wrapper"
                    state={listData}
                    data-testid="card"
                  >
                    <div className="item__img__wrapper">
                      <figure className="item__text_effect">
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = '/images/png/img_not_found.png';
                          }}
                          className="item__img"
                          src={imgSrc}
                          alt={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                        />
                        <figcaption className="item__figcaption">
                          <p className="item__img__title">
                            {(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </Link>
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
            <div className="pageNumber">{currentPage}</div>
            <button className="button" onClick={incrementPage} disabled={!listData?.next}>
              Next
            </button>
          </div>
        </div>
        <div
          data-testid="items__right"
          className={`${isOpen ? 'items__right' : 'items__right hidden'}`}
        >
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
