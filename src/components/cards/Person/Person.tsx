import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Person.module.scss';
import getDataByLink from '../../../services/api/getDataByLink';
import { IPersonData, IPlanetData, ISpecieData } from '../../../types/types';
import getPersonData from '../../../services/api/getPersonData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';
import SmallLoader from '../../SmallLoader/SmallLoader';

const Person: React.FC = () => {
  const params = useParams();
  const [itemData, setItemData] = useState<null | IPersonData>(null);
  const [planetData, setPlanetData] = useState<null | IPlanetData>(null);
  const [speciesData, setSpeciesData] = useState<null | ISpecieData>(null);

  const fetchPersonData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);
    const speciesData: ISpecieData = await getDataByLink(itemData.species[0]);
    await setItemData(itemData);
    await setPlanetData(planetData);
    await setSpeciesData(speciesData);
  };

  useEffect(() => {
    fetchPersonData(params.id as string);
  }, [params.id]);

  if (!itemData) {
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

  if (itemData) {
    const personId: string = itemData.url.replace(/[^0-9]/g, '');
    const peopleImgSrc: string = `/images/people/${personId}.jpg`;
    const planetLink: string = '/' + planetData?.url.split('/').slice(4).join('/');
    const specieLink: string = '/' + speciesData?.url.split('/').slice(4).join('/');

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <div className={styles.item__data}>
              <div className={styles.description}>
                <h1 className={styles.item__title}>{itemData.name}</h1>
                <span id={styles.item__specie_title}>
                  {!!itemData.species.length && (
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
                  {itemData.name} was born
                  {hasNoData(itemData.birth_year) ? '' : ` in ${itemData.birth_year}`}
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
                  {itemData.gender === 'male'
                    ? 'He'
                    : itemData.gender === 'female'
                    ? 'She'
                    : 'It'}{' '}
                  has {hasNoData(itemData.eye_color) ? '' : `${itemData.eye_color} eyes and `}
                  {hasNoData(itemData.hair_color) ? 'no hair' : `${itemData.hair_color} hair`}
                  {'.'}
                </p>
                <div>
                  {!hasNoData(itemData.mass) && isNaN(+itemData.mass) && (
                    <p>Mass: {+itemData.mass.replace(',', '')} kg</p>
                  )}
                  <p>Height: {+itemData.height / 100} m</p>
                  {hasNoData(itemData.skin_color) || <p>Skin color: {itemData.skin_color}</p>}
                </div>
              </div>
              <img className={styles.item__img} alt={itemData.name} src={peopleImgSrc} />
            </div>

            <div className={styles.attributes_container}>
              {!!itemData.films.length && (
                <AttributesBlock data={itemData.films} classNames={['item__link']} title="Films" />
              )}
              {!!itemData.starships.length && (
                <AttributesBlock
                  data={itemData.starships}
                  classNames={['item__link']}
                  title="Starships"
                />
              )}
              {!!itemData.vehicles.length && (
                <AttributesBlock
                  data={itemData.vehicles}
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
