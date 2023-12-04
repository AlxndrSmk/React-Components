import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import countriesReducer from './reducers/countriesSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
