import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Planet.module.scss';
import Loader from '../../Loader/Loader';
import { IPlanetData } from '../../../types/types';
import getPlanetData from '../../../services/api/getPlanetData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

const Planet: React.FC = () => {
  const params = useParams();
  const [planetData, setPlanetData] = useState<null | IPlanetData>(null);

  const fetchPlanetData = async (id: string) => {
    const planetData: IPlanetData = await getPlanetData(id);
    await setPlanetData(planetData);
  };

  useEffect(() => {
    fetchPlanetData(params.id as string);
  }, [params.id]);

  if (!planetData) {
    return <Loader />;
  }

  if (planetData) {
    const planetId: string = planetData.url.replace(/[^0-9]/g, '');
    const planetImgSrc: string = `/images/planets/${planetId}.jpg`;

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <h1 className={styles.item__title}>{planetData.name}</h1>
            <div>
              {hasNoData(planetData.climate) || <p>Climate: {planetData.climate}</p>}
              {hasNoData(planetData.terrain) || <p>Terrain: {planetData.terrain}</p>}
              {hasNoData(planetData.diameter) || (
                <p>Diameter: {Number(planetData.diameter).toLocaleString()} km</p>
              )}
              {hasNoData(planetData.gravity) || <p>Gravity: {planetData.gravity}</p>}
              {hasNoData(planetData.rotation_period) || (
                <p>Rotation period: {planetData.rotation_period} hours</p>
              )}
              {hasNoData(planetData.orbital_period) || (
                <p>Orbital period: {planetData.orbital_period} days</p>
              )}
              {hasNoData(planetData.surface_water) || (
                <p>Water coverage: {planetData.surface_water}%</p>
              )}
              {hasNoData(planetData.population) || (
                <p>Population: {Number(planetData.population).toLocaleString()}</p>
              )}
            </div>
            <div className={styles.attributes_container}>
              {!!planetData.films.length && (
                <AttributesBlock
                  data={planetData.films}
                  classNames={['item__link']}
                  title="Films"
                />
              )}
              {!!planetData.residents.length && (
                <AttributesBlock
                  data={planetData.residents}
                  classNames={['item']}
                  title="Residents"
                  isLink={false}
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
            }}
            alt={planetData.name}
            src={planetImgSrc}
          />
        </div>
      </div>
    );
  }
};

export default Planet;
