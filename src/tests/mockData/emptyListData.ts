import { IListProps } from '../../types/types';

export const emptyListData: IListProps = {
  decrementPage: vi.fn(),
  handleSubmit: vi.fn(),
  incrementPage: vi.fn(),
  isDataLoaded: true,
  listData: {
    count: 0,
    next: 'next',
    previous: null,
    results: [],
  },
  pathName: 'mockPath',
  currentPage: 1,
  handleSelectChange: vi.fn(),
  perPage: '5',
};
