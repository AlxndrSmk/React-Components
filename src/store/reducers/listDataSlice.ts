import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListDataState } from '../../types/types';

const initialState: ListDataState = {
  searchString: '',
  currentPage: '1',
};

export const listDataSlice = createSlice({
  name: 'listData',
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSearchString, setCurrentPage } = listDataSlice.actions;

export default listDataSlice.reducer;
