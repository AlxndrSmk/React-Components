import { createContext, useContext, useState } from 'react';
import { IListData, IListDataContext, IListDataProvider } from '../types/types';

const ListDataContext = createContext<IListDataContext>({
  listData: [],
  searchString: '',
  saveListData: async () => {},
  saveSearchString: async () => {},
});

export const ListDataProvider = ({ children }: IListDataProvider) => {
  const [listData, setListData] = useState<IListData | []>([]);
  const [searchString, setSearchString] = useState<string>('');

  const saveListData = async (data: IListData) => {
    setListData(data);
  };

  const saveSearchString = async (data: string) => {
    setSearchString(data);
  };

  return (
    <ListDataContext.Provider value={{ listData, saveListData, searchString, saveSearchString }}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useListData = () => {
  const context = useContext(ListDataContext);
  return context;
};
