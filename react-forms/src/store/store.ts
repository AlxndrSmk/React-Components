import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './reducers/formSlice';

const store = configureStore({
  reducer: formSlice.reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
