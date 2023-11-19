import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { IFilmData, IListProps, TAllCardsDataWithName } from '../../types/types';
import { ChangeEvent, useEffect, useState } from 'react';

import { setCurrentPage, setListData, setPerPage } from '../../store/reducers/listDataSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import SearchInput from '../SearchInput/SearchInput';

import './List.scss';
import { useGetListDataQuery } from '../../store/api/listDataApi';
import { RootState } from '../../store/store';

const List: React.FC<IListProps> = ({ pathName, listName }) => {
  console.log(pathName);
  console.log(listName);

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { searchString, currentPage, perPage } = useAppSelector(
    (state: RootState) => state.listDataReducer
  );

  const { data, isFetching, refetch } = useGetListDataQuery({
    pathName: listName,
    searchString,
    currentPage,
  });

  useEffect(() => {
    if (id && data) {
      dispatch(setListData(data));
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

  const incrementPage = async () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const decrementPage = async () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage((event.target as HTMLSelectElement).value));
    refetch();
  };

  if (isFetching) {
    return <Loader />;
  }

  if (data) {
    return (
      <div className="list__wrapper" data-testid="list">
        <div
          className={`${isOpen ? 'items__left disabled' : 'items__left'}`}
          onClick={handleLeftClick}
          data-testid="items__left"
        >
          <div className="inputs__wrapper">
            <SearchInput />
            <div className="custom-select">
              <select onChange={handleSelectChange} value={perPage}>
                <option value="5">5 items</option>
                <option value="10">10 items</option>
              </select>
            </div>
          </div>
          <div className="items__wrapper">
            {data?.results?.length ? (
              data.results?.slice(0, +perPage).map((data) => {
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
            <button className="button" onClick={decrementPage} disabled={!data?.previous}>
              Prev
            </button>
            <div data-testid="pageNumber" className="pageNumber">
              {currentPage}
            </div>
            <button className="button" onClick={incrementPage} disabled={!data?.next}>
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
