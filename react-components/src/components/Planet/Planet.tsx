import React from 'react';
import styles from './Planet.module.scss';
import Loader from '../Loader/Loader';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPlanetProps, IPlanetState, IPlanetData, IFilmData, IPersonData } from '../../types/types';
import getPlanetData from '../../services/api/getPlanetData';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
import AttributesBlock from '../AttributesBlock/AttributesBlock';

class Planet extends React.Component<IPlanetProps, IPlanetState> {
  constructor(props: IPlanetProps) {
    super(props);

    this.state = {
      planetData: null,
      filmsData: null,
      residentsData: null,
    };
  }

  async setInitState() {
    await this.setState({
      planetData: null,
      filmsData: null,
      residentsData: null,
    });
  }

  getPlanetData = async (id: string) => {
    const planetData: IPlanetData = await getPlanetData(id);
    await this.setState({ planetData });

    const filmsData: IFilmData[] = await getArrayData(planetData.films);
    await this.setState({ filmsData });

    const residentsData: IPersonData[] = await getArrayData(planetData.residents);
    await this.setState({ residentsData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getPlanetData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getPlanetData(this.props.params.id);
    }
  };

  hasNoData(value) {
    return value === 'unknown' || value === '0' || value.toUpperCase() === 'N/A' || false;
  }

  render() {
    if (!this.state.planetData) {
      return <Loader />;
    }

    if (this.state.planetData) {
      console.log(this.state.planetData);
      const planetId: string = this.state.planetData.url.match(/\d+/)![0];
      const planetImgSrc: string = `/images/planets/${planetId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.planetData.name}</h1>
              <div>
                {this.hasNoData(this.state.planetData.climate) || (
                  <p>Climate: {this.state.planetData.climate}</p>
                )}
                {this.hasNoData(this.state.planetData.terrain) || (
                  <p>Terrain: {this.state.planetData.terrain}</p>
                )}
                {this.hasNoData(this.state.planetData.diameter) || (
                  <p>Diameter: {Number(this.state.planetData.diameter).toLocaleString()} km</p>
                )}
                {this.hasNoData(this.state.planetData.gravity) || (
                  <p>Gravity: {this.state.planetData.gravity}</p>
                )}
                {this.hasNoData(this.state.planetData.rotation_period) || (
                  <p>Rotation period: {this.state.planetData.rotation_period} hours</p>
                )}
                {this.hasNoData(this.state.planetData.orbital_period) || (
                  <p>Orbital period: {this.state.planetData.orbital_period} days</p>
                )}
                {this.hasNoData(this.state.planetData.surface_water) || (
                  <p>Water coverage: {this.state.planetData.surface_water}%</p>
                )}
                {this.hasNoData(this.state.planetData.population) || (
                  <p>Population: {Number(this.state.planetData.population).toLocaleString()}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.planetData.films.length && (
                  <AttributesBlock
                    data={this.state.filmsData}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.planetData.residents.length && (
                  <AttributesBlock
                    data={this.state.residentsData}
                    classNames={['item__link']}
                    title="Residents"
                  />
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
              alt={this.state.planetData.name}
              src={planetImgSrc}
            />
          </div>
          <Link
            onClick={() => {
              this.props.navigate(-1);
            }}
            className="button"
            to={''}
          >
            Go back
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Planet);
