import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListData } from '../../types/types';

export const listDataApi = createApi({
  reducerPath: 'listDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getListData: builder.query<
      IListData,
      { searchString: string; pageNumber: number; pathName: string }
    >({
      query: ({ searchString, pageNumber, pathName }) =>
        `${pathName}?search=${searchString}&page=${pageNumber}`,
    }),
  }),
});

export const { useGetListDataQuery } = listDataApi;
