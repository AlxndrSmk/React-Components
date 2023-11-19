import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { setCurrentPage } from './store/reducers/listDataSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { RootState } from './store/store';

import List from './components/List/List';

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

  useEffect(() => {
    const page: string = (new URLSearchParams(location.search).get('page') as string) || '1';
    dispatch(setCurrentPage(+page));
    setPathName(location.pathname.slice(1));
    setListName(location.pathname.slice(1).split('/')[0]);
  }, []);

  useEffect(() => {
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

  return <List listName={listName} pathName={listName} />;
};

export default App;
