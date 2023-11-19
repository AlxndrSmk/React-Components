import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListData, IPersonData, ListDataState } from '../../types/types';
import { initItemData, initListData } from '../../utils/constants';

const initialState: ListDataState = {
  itemData: initItemData,
  listData: initListData,
  searchString: '',
  currentPage: 1,
  perPage: '10',
  isListDataLoading: true,
  isItemDataLoading: true,
};

export const listDataSlice = createSlice({
  name: 'listData',
  initialState,
  reducers: {
    setListData(state, action: PayloadAction<IListData>) {
      state.listData = action.payload;
      state.isListDataLoading = false;
    },
    setItemData(state, action: PayloadAction<IPersonData>) {
      state.itemData = action.payload;
      state.isListDataLoading = false;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<string>) => {
      state.perPage = action.payload;
    },
  },
});

export const { setSearchString, setCurrentPage, setPerPage, setListData, setItemData } =
  listDataSlice.actions;

export default listDataSlice.reducer;
