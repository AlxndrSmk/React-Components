import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import getListData from './services/api/getListData';
import List from './components/List/List';
import { IListData } from './types/types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [listData, setListData] = useState<IListData | []>([]);
  const [pathName, setPathName] = useState<string>(document.location.pathname.slice(1));
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    const page: string = (new URLSearchParams(location.search).get('page') as string) || '1';
    const search: string = (new URLSearchParams(location.search).get('search') as string) || '';
    setCurrentPage(+page);
    setSearchString(search);
    setPathName(document.location.pathname.slice(1));
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      navigate(`/${pathName}?search=${searchString}&page=${currentPage}`);
      getData();
    }
  }, [currentPage]);

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
    setListData(data);
    setIsDataLoaded(true);
  };

  const handleSubmit = async (value: string) => {
    localStorage.setItem('inputValue', searchString);
    setSearchString(value);
    setCurrentPage(1);
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
    />
  );
};

export default App;
