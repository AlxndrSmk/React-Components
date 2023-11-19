import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListData, IPersonData, QueryParams } from '../../types/types';

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
    getItemData: builder.query<IPersonData, { id: string; itemsName: string }>({
      query: (args: QueryParams) => {
        const { id, itemsName } = args;
        return `${itemsName}/${id}`;
      },
    }),
  }),
});

export const { useGetListDataQuery, useGetItemDataQuery } = listDataApi;
