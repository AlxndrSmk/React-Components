import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { listDataApi } from './api/listDataApi';

export const store = configureStore({
  reducer: {
    [listDataApi.reducerPath]: listDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listDataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
