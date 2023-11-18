import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListData } from '../../types/types';

export const listDataApi = createApi({
  reducerPath: 'listDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getListDataByName: builder.query<
      IListData,
      { pathName: string; searchString: string; currentPage: number; perPage: string }
    >({
      query: ({ pathName, searchString, currentPage, perPage }) =>
        `${pathName}?search=${searchString}&page=${currentPage}&per_page=${perPage}`,
    }),
  }),
});

export const { useGetListDataByNameQuery } = listDataApi;
