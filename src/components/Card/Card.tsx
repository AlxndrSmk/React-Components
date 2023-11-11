import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
import { ICardProps, IFilmData, TAllCardsDataWithName } from '../../types/types';

const Card: React.FC<ICardProps> = ({ path, state, imgSrc, data }) => {
  return (
    <Link to={path} className={styles.item__wrapper} state={state} data-testid="card">
      <div className={styles.item__img__wrapper}>
        <figure className={styles.item__text_effect}>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/images/png/img_not_found.png';
            }}
            className={styles.item__img}
            src={imgSrc}
            alt={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
          />
          <figcaption className={styles.item__figcaption}>
            <p className={styles.item__img__title}>
              {(data as TAllCardsDataWithName).name || (data as IFilmData).title}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
};

export default Card;
