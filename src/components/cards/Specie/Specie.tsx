import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Specie.module.scss';
import Loader from '../../Loader/Loader';
import { IPlanetData, ISpecieData } from '../../../types/types';
import getSpecieData from '../../../services/api/getSpecieData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';
import getPlanetData from '../../../services/api/getPlanetData';

const Specie: React.FC = () => {
  const params = useParams();
  const [specieData, setSpecieData] = useState<null | ISpecieData>(null);
  const [planetData, setPlanetData] = useState<null | IPlanetData>(null);

  const fetchSpecieData = async (id: string) => {
    const specieData: ISpecieData = await getSpecieData(id);
    const planetData: IPlanetData = await getPlanetData(id);
    await setSpecieData(specieData);
    await setPlanetData(planetData);
  };

  useEffect(() => {
    fetchSpecieData(params.id as string);
  }, [params.id]);

  if (!specieData) {
    return <Loader />;
  }

  if (specieData) {
    const specieId: string = specieData.url.replace(/[^0-9]/g, '');
    const specieImgSrc: string = `/images/species/${specieId}.jpg`;
    const planetLink: string = '/' + planetData?.url.split('/').slice(4).join('/');

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <h1 className={styles.item__title}>{specieData.name}</h1>
            <div>
              {hasNoData(planetData?.name) || (
                <>
                  <p className="inline">Planet: </p>
                  <Link className="item__link uppercase inline" to={planetLink}>
                    {planetData?.name}
                  </Link>
                </>
              )}
              {hasNoData(specieData.classification) || (
                <p>Classification: {specieData.classification}</p>
              )}
              {hasNoData(specieData.designation) || <p>Designation: {specieData.designation}</p>}
              {hasNoData(specieData.average_height) || (
                <p>Average height: {Number(specieData.average_height) / 100} m</p>
              )}
              {hasNoData(specieData.skin_colors) || <p>Skin colors: {specieData.skin_colors}</p>}
              {hasNoData(specieData.hair_colors) || <p>Hair colors: {specieData.hair_colors}</p>}
              {hasNoData(specieData.eye_colors) || <p>Eye colors: {specieData.eye_colors}</p>}
              {hasNoData(specieData.language) || <p>Language: {specieData.language}</p>}
            </div>
            <div className={styles.attributes_container}>
              {!!specieData.films.length && (
                <AttributesBlock
                  data={specieData.films}
                  classNames={['item__link']}
                  title="Films"
                />
              )}
              {!!specieData.people.length && (
                <AttributesBlock
                  data={specieData.people}
                  classNames={['item']}
                  title="People"
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
            alt={specieData.name}
            src={specieImgSrc}
          />
        </div>
      </div>
    );
  }
};

export default Specie;
