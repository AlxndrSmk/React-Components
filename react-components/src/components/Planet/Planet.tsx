import React from 'react';
import styles from './Planet.module.scss';
import Loader from '../Loader/Loader';
// import getDataByLink from '../../services/api/getDataByLink';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPersonProps, IPersonState, IPlanetData } from '../../types/types';
import getPlanetData from '../../services/api/getPlanetData';

class Planet extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      planetData: null,
      isDataLoaded: false,
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.getPlanetData();
  };

  getPlanetData = async () => {
    const planetData: IPlanetData = await getPlanetData(this.props.params.id);
    this.setState({ planetData, isDataLoaded: true });
  };

  render() {
    if (!this.state.planetData) {
      return <Loader />;
    }

    if (this.state.planetData) {
      console.log(this.state.planetData);

      const planetId: string = this.state.planetData.url.match(/\d+/)![0];
      const imgSrc = `/images/planets/${planetId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__title}>{this.state.planetData.name}</div>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <p>Climate: {this.state.planetData.climate}</p>
              <p>Diameter: {this.state.planetData.diameter}</p>
              <p>Gravity: {this.state.planetData.gravity}</p>
              <p>Orbital period: {this.state.planetData.gravity}</p>
              {this.state.planetData.population === 'unknown' || (
                <p>Population: {this.state.planetData.population}</p>
              )}
              {this.state.planetData.population === 'unknown' || (
                <p>Rotation period: {this.state.planetData.rotation_period}</p>
              )}
              {this.state.planetData.population === 'unknown' || (
                <p>Surface water: {this.state.planetData.surface_water}</p>
              )}
              <p>Terrain: {this.state.planetData.terrain}</p>
            </div>
            <div className={styles.item__container_right}>
              <img
                className={styles.item__img}
                alt={this.state.planetData.name}
                src={imgSrc}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = '/images/png/img_not_found.png';
                }}
              />
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

export default withRouter(Planet);
