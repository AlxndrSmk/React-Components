import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AttributesBlock.module.scss';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
import SmallLoader from '../SmallLoader/SmallLoader';
import {
  IAttributesBlockProps,
  IFilmData,
  IStarshipData,
  TAllCardsData,
  TAllCardsDataWithName,
} from '../../types/types';

const AttributesBlock: React.FC<IAttributesBlockProps> = ({ data, classNames, title, isLink }) => {
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<TAllCardsData>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);

  const incrementPage = async () => {
    setFetchedData(null);
    setCurrentPage(currentPage + 1);
  };

  const decrementPage = () => {
    setFetchedData(null);
    currentPage > 0 && setCurrentPage(currentPage - 1);
  };

  const fetchData = async (links: string[]) => {
    const fetchedData = await getArrayData(links);
    await setFetchedData(fetchedData);
  };

  useEffect(() => {
    const allPagesLinks = data;
    const pageSize = itemsPerPage;
    const pages: Array<Array<string>> = [];

    for (let i = 0; i < allPagesLinks.length; i += pageSize) {
      pages.push((allPagesLinks as string[]).slice(i, i + pageSize));
    }

    fetchData(pages[currentPage]);

    currentPage === 0 ? setIsPrevDisabled(true) : setIsPrevDisabled(false);
    currentPage === pages.length - 1 ? setIsNextDisabled(true) : setIsNextDisabled(false);
  }, [currentPage]);

  return (
    <div className={styles.attributes_block}>
      <div className={styles.attributes_content}>
        <p className={styles.attributes_title}>{title}</p>

        {fetchedData ? (
          <>
            {fetchedData.map((item) => {
              const link: string = '/' + item.url.split('/').slice(4).join('/');

              if (isLink === false) {
                return (
                  <p
                    className={classNames.join(' ')}
                    key={(item as IStarshipData).name || (item as IFilmData).title}
                  >
                    {(item as TAllCardsDataWithName).name || (item as IFilmData).title}
                  </p>
                );
              }
              return (
                <Link
                  className={classNames.join(' ')}
                  key={(item as IStarshipData).name || (item as IFilmData).title}
                  to={link}
                >
                  {(item as TAllCardsDataWithName).name || (item as IFilmData).title}
                </Link>
              );
            })}
          </>
        ) : (
          <SmallLoader />
        )}
      </div>
      <div className="buttons">
        <button className="button" onClick={decrementPage} disabled={isPrevDisabled}>
          Prev
        </button>
        <button className="button" onClick={incrementPage} disabled={isNextDisabled}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AttributesBlock;
