import React, { useEffect, useState } from 'react';
import getListData from './services/api/getListData';
import List from './components/List/List';
import { IListData } from './types/types';
import { useLocation, useNavigate } from 'react-router';
import { useListData } from './context/listDataProvider';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pathName, setPathName] = useState<string>(location.pathname.slice(1));
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<string>('10');

  const { listData, saveListData } = useListData();
  const { searchString, saveSearchString } = useListData();

  useEffect(() => {
    const page: string = (new URLSearchParams(location.search).get('page') as string) || '1';
    const search: string = localStorage.getItem('inputValue') || '';
    setCurrentPage(+page);
    saveSearchString(search);
    setPathName(location.pathname.slice(1));
  }, []);

  useEffect(() => {
    if (currentPage > 0 && pathNames.includes(pathName)) {
      navigate(`/${pathName}?search=${searchString}&page=${currentPage}&per_page=${perPage}`);
      getData();
    }
  }, [currentPage, searchString]);

  useEffect(() => {
    if (currentPage > 0) {
      setPathName(location.pathname.slice(1));
      setCurrentPage(1);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentPage > 0) {
      navigate(`/${pathName}?search=${searchString}&page=${currentPage}&per_page=${perPage}`);
      setCurrentPage(1);
      getData();
    }
  }, [perPage]);

  const incrementPage = async () => {
    setCurrentPage(currentPage + 1);
  };

  const decrementPage = async () => {
    setCurrentPage(currentPage - 1);
  };

  const getData = async () => {
    const selectedPage = currentPage;
    setIsDataLoaded(false);
    const data = await getListData(searchString, selectedPage, pathName);
    saveListData(data);
    setIsDataLoaded(true);
  };

  const handleSubmit = async (value: string) => {
    localStorage.setItem('inputValue', value);
    saveSearchString(value);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string) => {
    setPerPage(value);
  };

  return (
    <List
      handleSubmit={handleSubmit}
      listData={listData as IListData}
      isDataLoaded={isDataLoaded}
      incrementPage={incrementPage}
      decrementPage={decrementPage}
      pathName={pathName}
      currentPage={currentPage}
      handleSelectChange={handleSelectChange}
      perPage={perPage}
    />
  );
};

export default App;
