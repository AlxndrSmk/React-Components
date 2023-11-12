import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Person.module.scss';
import getDataByLink from '../../../services/api/getDataByLink';
import { IPersonData, IPlanetData, ISpecieData } from '../../../types/types';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';
import SmallLoader from '../../SmallLoader/SmallLoader';
import getItemData from '../../../services/api/getItemData';

const Person: React.FC = () => {
  const params = useParams();
  const [personData, setPersonData] = useState<null | IPersonData>(null);
  const [planetData, setPlanetData] = useState<null | IPlanetData>(null);
  const [speciesData, setSpeciesData] = useState<null | ISpecieData>(null);

  const fetchPersonData = async (id: string) => {
    const itemData: IPersonData = await getItemData(id, 'people');
    await setPersonData(itemData);

    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);
    await setPlanetData(planetData);

    const speciesData: ISpecieData = await getDataByLink(itemData.species[0]);
    await setSpeciesData(speciesData);
  };

  useEffect(() => {
    fetchPersonData(params.id as string);
  }, [params.id]);

  if (!personData) {
    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <SmallLoader />
          </div>
        </div>
      </div>
    );
  }

  if (personData) {
    const personId: string = personData.url.replace(/[^0-9]/g, '');
    const peopleImgSrc: string = `/images/people/${personId}.jpg`;
    const planetLink: string = '/' + planetData?.url.split('/').slice(4).join('/');
    const specieLink: string = '/' + speciesData?.url.split('/').slice(4).join('/');

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <div className={styles.item__data}>
              <div className={styles.description}>
                <h1 className={styles.item__title}>{personData.name}</h1>
                <span id={styles.item__specie_title}>
                  {!!personData.species.length && (
                    <Link
                      className={'item__link item__link_specie uppercase inline'}
                      key={speciesData?.name}
                      to={specieLink}
                    >
                      {speciesData?.name}
                    </Link>
                  )}
                </span>
                <p className="item__description">
                  {personData.name} was born
                  {hasNoData(personData.birth_year) ? '' : ` in ${personData.birth_year}`}
                  {hasNoData(planetData?.name) ? (
                    ' in unknown '
                  ) : (
                    <>
                      {' '}
                      in{' '}
                      <Link className="item__link uppercase inline" to={planetLink}>
                        {planetData?.name}
                      </Link>
                    </>
                  )}{' '}
                  planet. <br />
                  {personData.gender === 'male'
                    ? 'He'
                    : personData.gender === 'female'
                    ? 'She'
                    : 'It'}{' '}
                  has {hasNoData(personData.eye_color) ? '' : `${personData.eye_color} eyes and `}
                  {hasNoData(personData.hair_color) ? 'no hair' : `${personData.hair_color} hair`}
                  {'.'}
                </p>
                <div>
                  {!hasNoData(personData.mass) && isNaN(+personData.mass) && (
                    <p>Mass: {+personData.mass.replace(',', '')} kg</p>
                  )}
                  <p>Height: {+personData.height / 100} m</p>
                  {hasNoData(personData.skin_color) || <p>Skin color: {personData.skin_color}</p>}
                </div>
              </div>
              <img className={styles.item__img} alt={personData.name} src={peopleImgSrc} />
            </div>

            <div className={styles.attributes_container}>
              {!!personData.films.length && (
                <AttributesBlock
                  data={personData.films}
                  classNames={['item__link']}
                  title="Films"
                />
              )}
              {!!personData.starships.length && (
                <AttributesBlock
                  data={personData.starships}
                  classNames={['item__link']}
                  title="Starships"
                />
              )}
              {!!personData.vehicles.length && (
                <AttributesBlock
                  data={personData.vehicles}
                  classNames={['item__link']}
                  title="Vehicles"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Person;
