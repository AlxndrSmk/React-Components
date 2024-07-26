import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { listDataApi } from './api/listDataApi';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [listDataApi.reducerPath]: listDataApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listDataApi.middleware),
  });

export type RootState = ReturnType<AppStore['getState']>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
