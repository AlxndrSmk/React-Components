import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListData } from '../../types/types';

export const listDataApi = createApi({
  reducerPath: 'listDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getListData: builder.query<
      IListData,
      { searchString: string; currentPage: number; pathName: string }
    >({
      query: ({ searchString, currentPage, pathName }) =>
        `${pathName}?search=${searchString}&page=${currentPage}`,
    }),
  }),
});

export const { useGetListDataQuery } = listDataApi;
