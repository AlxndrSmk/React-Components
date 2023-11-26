import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '@/store/store';
import { getListData, getRunningQueriesThunk } from '@/store/api/listDataApi';

import Card from '../components/Card/Card';
import SearchInput from '@/components/SearchInput/SearchInput';
import { IFilmData, IListProps, TAllCardsDataWithName } from '@/types/types';
import getRouterElement from '@/utils/getRouterElement';
import styles from '@/styles/people.module.scss';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { currentPage, searchString, perPage } = context.query;

  const { data } = await store.dispatch(
    getListData.initiate({
      searchString: getRouterElement(searchString, ''),
      currentPage: getRouterElement(currentPage, 1),
      perPage: getRouterElement(perPage, '10'),
    })
  );

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: { data },
  };
});

const List: React.FC<IListProps> = ({ children, data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { currentPage, perPage, searchString } = router.query;

  const href = {
    query: {
      searchString: searchString || '',
      currentPage: currentPage || 1,
      perPage: perPage || '10',
    },
  };

  useEffect(() => {
    router.push(href);
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      query: {
        searchString: searchString || '',
        currentPage: currentPage || 1,
        perPage: (event.target as HTMLSelectElement).value,
      },
    });
  };

  const incrementPage = async () => {
    router.push({
      query: {
        searchString,
        currentPage: Number(currentPage) + 1,
        perPage,
      },
    });
  };

  const decrementPage = async () => {
    router.push({
      query: {
        searchString,
        currentPage: Number(currentPage) - 1,
        perPage,
      },
    });
  };

  const closeCard = () => {
    setIsOpen(false);
  };

  const handleLeftClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.list__wrapper} data-testid="list">
      <div
        className={`${
          isOpen ? `${styles.items__left} ${styles.disabled}` : `${styles.items__left}`
        }`}
        onClick={handleLeftClick}
        data-testid="items__left"
      >
        <div className={styles.inputs__wrapper}>
          <SearchInput />
          <div className={styles.customSelect}>
            <select onChange={handleSelectChange} value={perPage}>
              <option value="10">10 items</option>
              <option value="5">5 items</option>
            </select>
          </div>
        </div>
        <div className={styles.items__wrapper}>
          {data?.results?.length ? (
            data.results?.map((item) => {
              const id: string = item.url.replace(/[^0-9]/g, '');
              const imgSrc = `/images/people/${id}.jpg`;
              const path = `people/${id}`;
              return (
                <Card
                  key={(item as TAllCardsDataWithName).name || (item as IFilmData).title}
                  data={item}
                  imgSrc={imgSrc}
                  path={path}
                />
              );
            })
          ) : (
            <div className={styles.noDataFound} data-testid="not-found">
              No data found
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={decrementPage} disabled={!data?.previous}>
            Prev
          </button>
          <div data-testid="pageNumber" className={styles.pageNumber}>
            {currentPage}
          </div>
          <button className={styles.button} onClick={incrementPage} disabled={!data?.next}>
            Next
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen ? `${styles.items__right}` : `${styles.items__right} ${styles.hidden}`
        }`}
      >
        <button className={`${styles.button} ${styles.button__close}`} onClick={closeCard}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default List;
