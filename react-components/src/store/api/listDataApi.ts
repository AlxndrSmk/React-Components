import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListData, IPersonData, QueryParams } from '../../types/types';
import { HYDRATE } from 'next-redux-wrapper';

export const listDataApi = createApi({
  reducerPath: 'listDataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getListData: builder.query<
      IListData,
      { searchString: string; currentPage: number; perPage: string }
    >({
      query: ({ searchString, currentPage, perPage }) =>
        `people?search=${searchString}&page=${currentPage}&perPage=${perPage}`,
    }),
    getItemData: builder.query<IPersonData, { id: string }>({
      query: (args: QueryParams) => {
        const { id } = args;
        return `people/${id}`;
      },
    }),
  }),
});

export const {
  useGetListDataQuery,
  useGetItemDataQuery,
  util: { getRunningQueriesThunk },
} = listDataApi;

export const { getListData, getItemData } = listDataApi.endpoints;
