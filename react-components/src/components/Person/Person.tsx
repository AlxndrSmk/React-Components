import styles from './Person.module.scss';
import hasNoData from '@/utils/hasNoData';
import { IPersonData } from '@/types/types';

type PersonProps = {
  itemData: IPersonData;
};

const Person: React.FC<PersonProps> = ({ itemData }) => {
  const data = itemData;

  if (data) {
    const personId: string = data.url.replace(/[^0-9]/g, '');
    const peopleImgSrc: string = `/images/people/${personId}.jpg`;

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <div className={styles.item__data}>
              <div className={styles.description}>
                <h1 className={styles.item__title}>{data.name}</h1>
                <span id={styles.item__specie_title}></span>
                <p className={styles.item__description}>
                  {data.name} was born
                  {hasNoData(data.birth_year) ? '' : ` in ${data.birth_year}.`}
                  <br />
                  {data.gender === 'male' ? 'He' : data.gender === 'female' ? 'She' : 'It'} has{' '}
                  {hasNoData(data.eye_color) ? '' : `${data.eye_color} eyes and `}
                  {hasNoData(data.hair_color) ? 'no hair' : `${data.hair_color} hair`}
                  {'.'}
                </p>
                <div>
                  {!hasNoData(data.mass) && isNaN(+data.mass) && (
                    <p>Mass: {+data.mass.replace(',', '')} kg.</p>
                  )}
                  <p>Height: {+data.height / 100} m.</p>
                  {hasNoData(data.skin_color) || <p>Skin color: {data.skin_color}.</p>}
                </div>
              </div>
              <img className={styles.item__img} alt={data.name} src={peopleImgSrc} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Person;
