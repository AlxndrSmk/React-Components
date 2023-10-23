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
  ISpecieData,
  IStarshipData,
  IFilmData,
  IVehicleData,
} from '../../types/types';
import getPersonData from '../../services/api/getPersonData';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
import renderLinksFromArray from '../../utils/heplerFunctions/RenderLinksFromArray';
import AttributesBlock from '../AttributesBlock/AttributesBlock';

class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      itemData: null,
      planetData: null,
      filmsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
    };
  }

  async setInitState() {
    await this.setState({
      itemData: null,
      planetData: null,
      filmsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
    });
  }

  getPersonData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);
    const speciesData: ISpecieData[] = await getArrayData(itemData.species);
    await this.setState({ itemData, planetData, speciesData });

    const filmsData: IFilmData[] = await getArrayData(itemData.films);
    await this.setState({ filmsData });

    const starshipsData: IStarshipData[] = await getArrayData(itemData.starships);
    await this.setState({ starshipsData });

    const vehiclesData: IVehicleData[] = await getArrayData(itemData.vehicles);
    await this.setState({ vehiclesData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getPersonData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getPersonData(this.props.params.id);
    }
  };

  render() {
    if (!this.state.itemData) {
      return <Loader />;
    }

    if (this.state.itemData) {
      console.log(this.state.itemData);
      const personId: string = this.state.itemData.url.match(/\d+/)![0];
      const peopleImgSrc: string = `/images/people/${personId}.jpg`;
      const planetLink: string = '/' + this.state.planetData?.url.split('/').slice(4).join('/');

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <div>
                <h1 className={styles.item__title}>{this.state.itemData.name}</h1>
                <span id={styles.item__specie_title}>
                  {renderLinksFromArray(this.state.speciesData, [
                    'item__link',
                    'item__link_specie',
                    'uppercase',
                    'inline',
                  ])}
                </span>
              </div>
              <p className="item__description">
                {this.state.itemData.name} was born
                {this.state.itemData.birth_year === 'unknown'
                  ? ''
                  : ` in ${this.state.itemData.birth_year}`}
                {this.state.planetData?.name === 'unknown' ? (
                  ' in unknown '
                ) : (
                  <>
                    {' '}
                    in{' '}
                    <Link className="item__link uppercase inline" to={planetLink}>
                      {this.state.planetData?.name}
                    </Link>
                  </>
                )}{' '}
                planet. <br />
                {this.state.itemData.gender === 'male'
                  ? 'He'
                  : this.state.itemData.gender === 'female'
                  ? 'She'
                  : 'It'}{' '}
                has {this.state.itemData.eye_color} eyes and{' '}
                {this.state.itemData.hair_color === 'n/a' ||
                this.state.itemData.hair_color === 'none'
                  ? 'no hair'
                  : `${this.state.itemData.hair_color} hair`}
                {'.'}
              </p>
              <div>
                {!isNaN(+this.state.itemData.mass) && <p>Mass: {+this.state.itemData.mass} kg</p>}
                <p>Height: {+this.state.itemData.height / 100} m</p>
                <p>Skin color: {this.state.itemData.skin_color}</p>
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.itemData.films.length && (
                  <AttributesBlock
                    data={this.state.filmsData}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.itemData.starships.length && (
                  <AttributesBlock
                    data={this.state.starshipsData}
                    classNames={['item__link']}
                    title="Starships"
                  />
                )}
                {!!this.state.itemData.vehicles.length && (
                  <AttributesBlock
                    data={this.state.vehiclesData}
                    classNames={['item__link']}
                    title="Vehicles"
                  />
                )}
              </div>
            </div>
            <img className={styles.item__img} alt={this.state.itemData.name} src={peopleImgSrc} />
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

export default withRouter(Person);
