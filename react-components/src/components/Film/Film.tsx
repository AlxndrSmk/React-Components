import React from 'react';
import styles from './Film.module.scss';
import Loader from '../Loader/Loader';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import {
  IFilmProps,
  IFilmState,
  IFilmData,
  IFilmData,
  IPersonData,
  IPlanetData,
  ISpecieData,
  IStarshipData,
  IVehicleData,
} from '../../types/types';
import getFilmData from '../../services/api/getFilmData';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
import hasNoData from '../../services/hasNoData';
import dateFormat from '../../services/dateFormat';
import renderLinksFromArray from '../../utils/heplerFunctions/RenderLinksFromArray';

class Planet extends React.Component<IFilmProps, IFilmState> {
  constructor(props: IFilmProps) {
    super(props);

    this.state = {
      filmData: null,
      charactersData: null,
      planetsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
      residentsData: null,
    };
  }

  async setInitState() {
    await this.setState({
      filmData: null,
      charactersData: null,
      planetsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
    });
  }

  getFilmData = async (id: string) => {
    const filmData: IFilmData = await getFilmData(id);
    await this.setState({ filmData });

    const charactersData: IPersonData[] = await getArrayData(filmData.characters);
    await this.setState({ charactersData });
    const planetsData: IPlanetData[] = await getArrayData(filmData.planets);
    await this.setState({ planetsData });
    const speciesData: ISpecieData[] = await getArrayData(filmData.species);
    await this.setState({ speciesData });
    const starshipsData: IStarshipData[] = await getArrayData(filmData.starships);
    await this.setState({ starshipsData });
    const vehiclesData: IVehicleData[] = await getArrayData(filmData.vehicles);
    await this.setState({ vehiclesData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getFilmData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getFilmData(this.props.params.id);
    }
  };

  render() {
    if (!this.state.filmData) {
      return <Loader />;
    }

    if (this.state.filmData) {
      console.log(this.state.filmData);
      console.log(this.state.filmData.planets);

      const filmId: string = this.state.filmData.url.match(/\d+/)![0];
      const filmImgSrc: string = `/images/films/${filmId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.filmData.title}</h1>
              <div>
                {hasNoData(this.state.filmData.opening_crawl) || (
                  <p className={styles.description}>{this.state.filmData.opening_crawl}</p>
                )}
                {hasNoData(this.state.filmData.director) || (
                  <p>Director: {this.state.filmData.director}</p>
                )}
                {hasNoData(this.state.filmData.producer) || (
                  <p>Producer: {this.state.filmData.producer}</p>
                )}
                {hasNoData(this.state.filmData.release_date) || (
                  <p>Release date: {dateFormat(this.state.filmData.release_date)}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {/* {!!this.state.filmData.characters.length && (
                  <AttributesBlock
                    data={this.state.characters}
                    classNames={['item__link']}
                    title="Characters"
                  />
                )} */}
                {!!this.state.filmData.planets.length &&
                  renderLinksFromArray(this.state.filmData.planets, ['item__link'])}
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
              alt={this.state.filmData.title}
              src={filmImgSrc}
            />
          </div>
          <Link
            onClick={() => {
              this.props.navigate(-1);
            }}
            className="button"
            to={''}
          >
            Back to search
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Planet);
