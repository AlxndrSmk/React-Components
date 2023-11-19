import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import List from './components/List/List';
import { useGetListDataQuery } from './store/api/listDataApi';
import { setSearchString } from './store/reducers/listDataSlice';
import { useAppDispatch } from './hooks';
import { useListData } from './context/ListDataProvider';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];
  const [currentPage, setCurrentPage] = useState<number>(
    +((new URLSearchParams(location.search).get('page') as string) || '1')
  );
  const [pathName, setPathName] = useState<string>(location.pathname.slice(1));
  const [listName, setListName] = useState<string>(location.pathname.slice(1).split('/')[0]);
  const [perPage, setPerPage] = useState<string>(
    (new URLSearchParams(location.search).get('per_page') as string) || '10'
  );
  const { searchString, saveSearchString } = useListData();

  const { data, isFetching } = useGetListDataQuery({
    pathName: listName,
    searchString,
    pageNumber: currentPage,
  });

  useEffect(() => {
    const page: string = (new URLSearchParams(location.search).get('page') as string) || '1';
    const search: string = localStorage.getItem('inputValue') || '';
    setCurrentPage(+page);
    saveSearchString(search);
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
    setCurrentPage(currentPage + 1);
  };

  const decrementPage = async () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async (value: string) => {
    dispatch(setSearchString(value));
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string) => {
    setPerPage(value);
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
