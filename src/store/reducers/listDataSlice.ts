import { ListDataState } from '../../types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ListDataState = {
  data: null,
  loading: 'idle',
  error: null,
  searchString: '',
  currentPage: 1,
  perPage: '10',
};

export const listDataSlice = createSlice({
  name: 'listData',
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.loading = 'pending';
      state.error = null;
    },
    getDataSuccess: (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
    },
    getDataFailure: (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    },
    updateSearchParams: (state, action) => {
      state.searchString = action.payload.searchString;
      state.currentPage = action.payload.currentPage;
      state.perPage = action.payload.perPage;
    },
  },
});

export const { getDataStart, getDataSuccess, getDataFailure, updateSearchParams } =
  listDataSlice.actions;

export default listDataSlice.reducer;
