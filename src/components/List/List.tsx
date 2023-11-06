import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import SearchInput from '../SearchInput/SearchInput';
import './List.scss';
import { IFilmData, IListProps, TAllCardsDataWithName } from '../../types/types';

const List: React.FC<IListProps> = ({
  decrementPage,
  handleSubmit,
  incrementPage,
  isDataLoaded,
  listData,
  pathName,
  currentPage,
}) => {
  if (!isDataLoaded) {
    return <Loader />;
  }

  if (isDataLoaded) {
    return (
      <>
        <SearchInput handleSubmit={handleSubmit} />
        <div className="items__wrapper">
          {listData?.results?.length ? (
            listData.results?.map((data) => {
              const listId: string = data.url.replace(/[^0-9]/g, '');
              const imgSrc = `/images/${pathName}/${listId}.jpg`;
              return (
                <Link
                  key={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                  to={`/${pathName}/${data.url.replace(/[^0-9]/g, '')}`}
                  className="item__wrapper"
                  state={listData}
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
            <div>No data found</div>
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
      </>
    );
  }
};

export default List;
