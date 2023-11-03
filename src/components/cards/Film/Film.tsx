import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Film.module.scss';
import Loader from '../../Loader/Loader';
import { IFilmData } from '../../../types/types';
import getFilmData from '../../../services/api/getFilmData';
import hasNoData from '../../../services/hasNoData';
import dateFormat from '../../../services/dateFormat';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';

const Film: React.FC = () => {
  const params = useParams();
  const [filmData, setFilmData] = useState<null | IFilmData>(null);

  const fetchFilmData = async (id: string) => {
    const filmData: IFilmData = await getFilmData(id);
    await setFilmData(filmData);
  };

  useEffect(() => {
    fetchFilmData(params.id as string);
  }, [params.id]);

  if (!filmData) {
    return <Loader />;
  }

  if (filmData) {
    const filmId: string = filmData.url.replace(/[^0-9]/g, '');
    const filmImgSrc: string = `/images/films/${filmId}.jpg`;

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__wrapper_description}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{filmData.title}</h1>
              <div>
                {hasNoData(filmData.opening_crawl) || (
                  <p className={styles.description}>{filmData.opening_crawl}</p>
                )}
                {hasNoData(filmData.director) || <p>Director: {filmData.director}</p>}
                {hasNoData(filmData.producer) || <p>Producer: {filmData.producer}</p>}
                {hasNoData(filmData.release_date) || (
                  <p>Release date: {dateFormat(filmData.release_date)}</p>
                )}
              </div>
            </div>
            <img
              className={styles.item__img}
              onError={({ currentTarget }) => {
                console.clear();
                currentTarget.onerror = null;
                currentTarget.src = '/images/png/img_not_found.png';
                currentTarget.style.width = '400px';
              }}
              alt={filmData.title}
              src={filmImgSrc}
            />
          </div>
          <div className={styles.attributes_container}>
            {!!filmData.characters.length && (
              <AttributesBlock
                data={filmData.characters}
                classNames={['item__link']}
                title="Characters"
              />
            )}
            {!!filmData.planets.length && (
              <AttributesBlock
                data={filmData.planets}
                classNames={['item__link']}
                title="Planets"
              />
            )}
            {!!filmData.starships.length && (
              <AttributesBlock
                data={filmData.starships}
                classNames={['item__link']}
                title="Starships"
              />
            )}
            {!!filmData.vehicles.length && (
              <AttributesBlock
                data={filmData.vehicles}
                classNames={['item__link']}
                title="Vehicles"
              />
            )}
            {!!filmData.species.length && (
              <AttributesBlock
                data={filmData.species}
                classNames={['item__link']}
                title="Species"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Film;
