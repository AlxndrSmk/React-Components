import React from 'react';
import styles from './Planet.module.scss';
import Loader from '../../Loader/Loader';
import withRouter from '../../../utils/withRouter';
import { IPlanetState, IPlanetData, RouterProps } from '../../../types/types';
import getPlanetData from '../../../services/api/getPlanetData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

class Planet extends React.Component<RouterProps, IPlanetState> {
  constructor(props: RouterProps) {
    super(props);

    this.state = {
      planetData: null,
    };
  }

  async setInitState() {
    await this.setState({
      planetData: null,
    });
  }

  getPlanetData = async (id: string) => {
    const planetData: IPlanetData = await getPlanetData(id);
    await this.setState({ planetData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getPlanetData(this.props.params.id as string);
  };

  componentDidUpdate = async (prevProps: RouterProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getPlanetData(this.props.params.id as string);
    }
  };

  render() {
    if (!this.state.planetData) {
      return <Loader />;
    }

    if (this.state.planetData) {
      const planetId: string = this.state.planetData.url.replace(/[^0-9]/g, '');
      const planetImgSrc: string = `/images/planets/${planetId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.planetData.name}</h1>
              <div>
                {hasNoData(this.state.planetData.climate) || (
                  <p>Climate: {this.state.planetData.climate}</p>
                )}
                {hasNoData(this.state.planetData.terrain) || (
                  <p>Terrain: {this.state.planetData.terrain}</p>
                )}
                {hasNoData(this.state.planetData.diameter) || (
                  <p>Diameter: {Number(this.state.planetData.diameter).toLocaleString()} km</p>
                )}
                {hasNoData(this.state.planetData.gravity) || (
                  <p>Gravity: {this.state.planetData.gravity}</p>
                )}
                {hasNoData(this.state.planetData.rotation_period) || (
                  <p>Rotation period: {this.state.planetData.rotation_period} hours</p>
                )}
                {hasNoData(this.state.planetData.orbital_period) || (
                  <p>Orbital period: {this.state.planetData.orbital_period} days</p>
                )}
                {hasNoData(this.state.planetData.surface_water) || (
                  <p>Water coverage: {this.state.planetData.surface_water}%</p>
                )}
                {hasNoData(this.state.planetData.population) || (
                  <p>Population: {Number(this.state.planetData.population).toLocaleString()}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.planetData.films.length && (
                  <AttributesBlock
                    data={this.state.planetData.films}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.planetData.residents.length && (
                  <AttributesBlock
                    data={this.state.planetData.residents}
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
        </div>
      );
    }
  }
}

export default withRouter<RouterProps>(Planet);
