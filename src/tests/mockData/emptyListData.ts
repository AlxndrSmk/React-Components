import { IListProps } from '../../types/types';

export const emptyListData: IListProps = {
  decrementPage: vi.fn(),
  handleSubmit: vi.fn(),
  incrementPage: vi.fn(),
  pathName: 'mockPath',
  currentPage: 1,
  handleSelectChange: vi.fn(),
  perPage: '5',
  searchString: '',
  listData: undefined,
  isLoading: false,
};
