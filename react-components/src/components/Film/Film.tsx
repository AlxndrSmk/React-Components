import React from 'react';
import styles from './Film.module.scss';
import Loader from '../Loader/Loader';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IFilmProps, IFilmState, IFilmData, IFilmData } from '../../types/types';
import getFilmData from '../../services/api/getFilmData';
import hasNoData from '../../services/hasNoData';
import dateFormat from '../../services/dateFormat';
import AttributesBlock from '../AttributesBlock/AttributesBlock';

class Planet extends React.Component<IFilmProps, IFilmState> {
  constructor(props: IFilmProps) {
    super(props);

    this.state = {
      filmData: null,
    };
  }

  async setInitState() {
    await this.setState({
      filmData: null,
    });
  }

  getFilmData = async (id: string) => {
    const filmData: IFilmData = await getFilmData(id);
    await this.setState({ filmData });
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

      const filmId: string = this.state.filmData.url.match(/\d+/)![0];
      const filmImgSrc: string = `/images/films/${filmId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__wrapper_description}>
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
            <div className={styles.attributes_container}>
              {!!this.state.filmData.characters.length && (
                <AttributesBlock
                  data={this.state.filmData.characters}
                  classNames={['item__link']}
                  title="Characters"
                />
              )}
              {!!this.state.filmData.planets.length && (
                <AttributesBlock
                  data={this.state.filmData.planets}
                  classNames={['item__link']}
                  title="Planets"
                />
              )}
              {!!this.state.filmData.starships.length && (
                <AttributesBlock
                  data={this.state.filmData.starships}
                  classNames={['item__link']}
                  title="Starships"
                />
              )}
              {!!this.state.filmData.vehicles.length && (
                <AttributesBlock
                  data={this.state.filmData.vehicles}
                  classNames={['item__link']}
                  title="Vehicles"
                />
              )}
              {!!this.state.filmData.species.length && (
                <AttributesBlock
                  data={this.state.filmData.species}
                  classNames={['item__link']}
                  title="Species"
                />
              )}
            </div>
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
