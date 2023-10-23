import React from 'react';
import styles from './Planet.module.scss';
import Loader from '../Loader/Loader';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPlanetProps, IPlanetState, IPlanetData, IFilmData, IPersonData } from '../../types/types';
import getPlanetData from '../../services/api/getPlanetData';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
// import renderLinksFromArray from '../../utils/heplerFunctions/RenderLinksFromArray';
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

  render() {
    if (!this.state.planetData) {
      return <Loader />;
    }

    if (this.state.planetData) {
      console.log(this.state.planetData);
      const planetId: string = this.state.planetData.url.match(/\d+/)![0];
      const planetImgSrc: string = `/images/planets/${planetId}.jpg`;
      // const planetLink: string = '/' + this.state.planetData?.url.split('/').slice(4).join('/');

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.planetData.name}</h1>
              <div>
                <p>Climate: {this.state.planetData.climate}</p>
                <p>Diameter: {+this.state.planetData.diameter / 100}</p>
                <p>Gravity: {this.state.planetData.gravity}</p>
                <p>Hours in day in year: {this.state.planetData.rotation_period}</p>
                <p>Terrain: {this.state.planetData.terrain}</p>
                <p>water coverage percentage: {this.state.planetData.surface_water}%</p>
                <p>Days in year: {this.state.planetData.orbital_period}</p>
                <p>Population: {this.state.planetData.population}</p>
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
                    data={this.state.starshipsData}
                    classNames={['item__link']}
                    title="Residents"
                  />
                )}
                {!!this.state.planetData.vehicles.length && (
                  <AttributesBlock
                    data={this.state.vehiclesData}
                    classNames={['item__link']}
                    title="Vehicles"
                  />
                )}
              </div>
            </div>
            <img className={styles.item__img} alt={this.state.planetData.name} src={planetImgSrc} />
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
