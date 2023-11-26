import Link from 'next/link';
import styles from './Card.module.scss';
import { ICardProps, IFilmData, TAllCardsDataWithName } from '../../types/types';

const Card: React.FC<ICardProps> = ({ path, imgSrc, data }) => {
  return (
    <Link href={path} className={styles.item__wrapper} data-testid="card">
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
