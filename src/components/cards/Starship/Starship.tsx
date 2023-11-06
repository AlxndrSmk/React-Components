import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Starship.module.scss';
import Loader from '../../Loader/Loader';
import { IStarshipData } from '../../../types/types';
import getStarshipData from '../../../services/api/getStarshipData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

const Starship: React.FC = () => {
  const params = useParams();
  const [starshipData, setStarshipData] = useState<null | IStarshipData>(null);

  const fetchStarshipData = async (id: string) => {
    const starshipData: IStarshipData = await getStarshipData(id);
    await setStarshipData(starshipData);
  };

  useEffect(() => {
    fetchStarshipData(params.id as string);
  }, [params.id]);

  if (!starshipData) {
    return <Loader />;
  }

  if (starshipData) {
    const starshipId: string = starshipData.url.replace(/[^0-9]/g, '');
    const starshipImgSrc: string = `/images/starships/${starshipId}.jpg`;

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <h1 className={styles.item__title}>{starshipData.name}</h1>
            <div>
              {hasNoData(starshipData.hyperdrive_rating) || (
                <p>Hyperdrive rating: {starshipData.hyperdrive_rating} / 5</p>
              )}
              {hasNoData(starshipData.model) || <p>Model: {starshipData.model}</p>}
              {hasNoData(starshipData.manufacturer) || (
                <p>Manufacturer: {starshipData.manufacturer}</p>
              )}
              {hasNoData(starshipData.starship_class) || (
                <p>Class: {starshipData.starship_class}</p>
              )}
              {hasNoData(starshipData.cost_in_credits) || (
                <p>Cost: {Number(starshipData.cost_in_credits).toLocaleString()} credits</p>
              )}
              {hasNoData(starshipData.length) || <p>Length: {starshipData.length} m</p>}
              {hasNoData(starshipData.max_atmosphering_speed) || (
                <p>
                  Max atmosphering speed:{' '}
                  {Number(starshipData.max_atmosphering_speed).toLocaleString()} km/h
                </p>
              )}
              {hasNoData(starshipData.crew) || <p>Crew: {starshipData.crew}</p>}
              {hasNoData(starshipData.passengers) || <p>Passengers: {starshipData.passengers}</p>}
              {hasNoData(starshipData.cargo_capacity) || (
                <p>Cargo capacity: {Number(starshipData.cargo_capacity).toLocaleString()} kg</p>
              )}
              {hasNoData(starshipData.consumables) || (
                <p>Consumables: {starshipData.consumables}</p>
              )}
              {hasNoData(starshipData.MGLT) || (
                <p>Maximum number of Megalights: {starshipData.MGLT}</p>
              )}
            </div>
            <div className={styles.attributes_container}>
              {!!starshipData.films.length && (
                <AttributesBlock
                  data={starshipData.films}
                  classNames={['item__link']}
                  title="Films"
                />
              )}
              {!!starshipData.pilots.length && (
                <AttributesBlock
                  data={starshipData.pilots}
                  classNames={['item__link']}
                  title="Pilots"
                />
              )}
            </div>
          </div>
          <img
            className={styles.item__img}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/images/png/img_not_found.png';
              currentTarget.style.width = '400px';
              console.clear();
            }}
            alt={starshipData.name}
            src={starshipImgSrc}
          />
        </div>
      </div>
    );
  }
};

export default Starship;
