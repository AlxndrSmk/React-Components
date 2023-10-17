import React from 'react';
import styles from './Person.module.scss';
import Loader from '../Loader/Loader';
import getDataByLink from '../../services/api/getDataByLink';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import {
  IPersonProps,
  IPersonState,
  IPersonData,
  IPlanetData,
  IFilmData,
  ISpecieData,
} from '../../types/types';
import getPersonData from '../../services/api/getPersonData';

class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      personData: null,
      planetData: null,
      filmsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
      isDataLoaded: false,
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.getPersonData(this.props.params.id);
  };

  getPersonData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);

    const filmsDataPromises: IFilmData[] = itemData.films.map(async (filmUrl) => {
      return await getDataByLink(filmUrl);
    });
    const filmsData = await Promise.all(filmsDataPromises);

    const speciesDataPromises: ISpecieData[] = itemData.species.map(async (specieUrl) => {
      return await getDataByLink(specieUrl);
    });
    const speciesData = await Promise.all(speciesDataPromises);

    this.setState({ personData: itemData, planetData, filmsData, speciesData, isDataLoaded: true });
  };

  render() {
    if (!this.state.personData) {
      return <Loader />;
    }

    if (this.state.personData) {
      console.log(this.state.personData);
      console.log(this.state.planetData);
      console.log(this.state.filmsData);
      console.log(this.state.speciesData);

      const personId: string = this.state.personData.url.match(/\d+/)![0];
      const peopleImgSrc: string = `/images/people/${personId}.jpg`;
      const planetLink: string = '/' + this.state.planetData?.url.split('/').slice(4).join('/');

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__title}>{this.state.personData.name}</div>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <p>
                {this.state.personData.name} was born in{' '}
                {this.state.planetData?.name === 'unknown' ? (
                  'unknown '
                ) : (
                  <Link className={styles.item__link} to={planetLink}>
                    {this.state.planetData?.name}
                  </Link>
                )}{' '}
                planet
                {this.state.personData.birth_year === 'unknown' ||
                  ` in ${this.state.personData.birth_year}`}
              </p>
              <p className={styles.item__eyeColor}>Eye color: {this.state.personData.eye_color}</p>
              <p className={styles.item__gender}>Gender: {this.state.personData.gender}</p>
              <p className={styles.item__hairColor}>
                Hair color: {this.state.personData.hair_color}
              </p>
              <p className={styles.item__weight}>Mass: {+this.state.personData.mass / 10} kg</p>
              <p className={styles.item__height}>Height: {+this.state.personData.height / 100} m</p>
            </div>
            <div className={styles.item__container_right}>
              <img
                className={styles.item__img}
                alt={this.state.personData.name}
                src={peopleImgSrc}
              />
              <div>Films</div>
              {this.state.filmsData.map((film) => {
                const filmId: string = film.url.match(/\d+/)![0];
                const filmImgSrc: string = `/images/films/${filmId}.jpg`;
                const filmLink: string = '/' + film.url.split('/').slice(4).join('/');

                return (
                  <Link key={film.title} to={filmLink}>
                    {' '}
                    <img
                      className={styles.icon}
                      alt={film.url}
                      src={filmImgSrc}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = '/images/png/img_not_found_small.png';
                      }}
                    />
                    {film.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            onClick={() => {
              this.props.navigate(-1);
            }}
            className="button button__back"
            to={''}
          >
            Go back
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Person);
