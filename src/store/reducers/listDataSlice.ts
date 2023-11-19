import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListDataState } from '../../types/types';

const initialState: ListDataState = {
  searchString: '',
  currentPage: 1,
  perPage: '10',
};

export const listDataSlice = createSlice({
  name: 'listData',
  initialState,
  reducers: {
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

export const { setSearchString, setCurrentPage, setPerPage } = listDataSlice.actions;

export default listDataSlice.reducer;
