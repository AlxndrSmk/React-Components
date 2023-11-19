import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { listDataApi } from './api/listDataApi';
import listDataReducer from './reducers/listDataSlice';

const rootReducer = combineReducers({
  listDataReducer,
  [listDataApi.reducerPath]: listDataApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listDataApi.middleware),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default rootReducer;
