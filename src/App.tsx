import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import List from './components/List/List';
import { useGetListDataQuery } from './store/api/listDataApi';
import { setSearchString, setCurrentPage, setPerPage } from './store/reducers/listDataSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { RootState } from './store/store';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];
  const [pathName, setPathName] = useState<string>(location.pathname.slice(1));
  const [listName, setListName] = useState<string>(location.pathname.slice(1).split('/')[0]);

  const { searchString, currentPage, perPage } = useAppSelector(
    (state: RootState) => state.listDataReducer
  );

  const { data, isFetching } = useGetListDataQuery({
    pathName: listName,
    searchString,
    currentPage,
  });

  useEffect(() => {
    const page: string = (new URLSearchParams(location.search).get('page') as string) || '1';
    dispatch(setCurrentPage(+page));
    setPathName(location.pathname.slice(1));
    setListName(location.pathname.slice(1).split('/')[0]);
  }, []);

  useEffect(() => {
    console.log('searchEffect');
    if (currentPage > 0 && pathNames.includes(listName)) {
      navigate(`/${pathName}?search=${searchString}&page=${currentPage}&per_page=${perPage}`);
    }
  }, [currentPage, searchString, perPage]);

  useEffect(() => {
    if (currentPage > 0) {
      setPathName(location.pathname.slice(1));
      setListName(location.pathname.slice(1).split('/')[0]);
    }
  }, [currentPage, location.pathname]);

  const incrementPage = async () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const decrementPage = async () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleSubmit = async (value: string) => {
    dispatch(setSearchString(value));
    dispatch(setCurrentPage(1));
  };

  const handleSelectChange = (value: string) => {
    dispatch(setPerPage(value));
  };

  return (
    <List
      isLoading={isFetching}
      listData={data}
      handleSubmit={handleSubmit}
      incrementPage={incrementPage}
      decrementPage={decrementPage}
      pathName={listName}
      currentPage={currentPage}
      handleSelectChange={handleSelectChange}
      perPage={perPage}
      searchString={searchString}
    />
  );
};

export default App;
