import Person from '@/components/Person/Person';
import { getItemData, listDataApi } from '@/store/api/listDataApi';
import { wrapper } from '@/store/store';
import { PersonProps } from '@/types/types';
import getRouterElement from '@/utils/getRouterElement';
import { useRouter } from 'next/router';

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
  const data = itemData;
  console.log(data);
  const router = useRouter();
  const itemId = router.query.id;

  // const { itemData } = props;
  // return <h1>Item {itemId}</h1>;
  return <Person itemData={data} />;
};

export default Details;
