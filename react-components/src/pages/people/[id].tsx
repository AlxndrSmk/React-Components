import { getItemData, listDataApi } from '@/store/api/listDataApi';
import { wrapper } from '@/store/store';
import Person from '@/components/Person/Person';
import { PersonProps } from '@/types/types';
import getRouterElement from '@/utils/getRouterElement';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  console.log(id);
  const item = await store.dispatch(
    getItemData.initiate({
      id: getRouterElement(id, ''),
    })
  );

  await Promise.all(store.dispatch(listDataApi.util.getRunningQueriesThunk()));

  return {
    props: {
      itemData: item.data,
    },
  };
});

const Details: React.FC<PersonProps> = ({ itemData }) => {
  return <Person itemData={itemData} />;
};

export default Details;
