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
import renderLinksFromArray from '../../utils/heplerFunctions/RenderLinksFromArray';

class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      itemId: '',
      itemData: null,
      planetData: null,
      filmsData: null,
      speciesData: null,
      starshipsData: null,
      vehiclesData: null,
      isDataLoaded: false,
    };
  }

  getArrayData = async (
    links: string[]
  ): Promise<IFilmData[] | ISpecieData[] | IStarshipData[] | IVehicleData[]> => {
    const promises = links.map(async (link) => {
      const response = await fetch(link);
      return await response.json();
    });

    const data = await Promise.all(promises);
    return data;
  };

  getPersonData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);
    const filmsData: IFilmData[] = await this.getArrayData(itemData.films);
    const speciesData: ISpecieData[] = await this.getArrayData(itemData.species);
    const starshipsData: IStarshipData[] = await this.getArrayData(itemData.starships);
    const vehiclesData: IVehicleData[] = await this.getArrayData(itemData.vehicles);

    console.log(itemData);
    console.log(filmsData);
    console.log(vehiclesData);

    await this.setState({
      itemId: id,
      itemData,
      planetData,
      filmsData,
      speciesData,
      starshipsData,
      vehiclesData,
    });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getPersonData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      console.log('updated');
      const newId = Number(this.props.params.id) + 1;
      await this.getPersonData(String(newId));
      console.log('updated');
    }
  };

  render() {
    if (!this.state.itemData) {
      return <Loader />;
    }

    if (this.state.itemData) {
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
                  ])}
                </span>
              </div>
              <p className="item__description">
                {this.state.itemData.name} was born
                {this.state.itemData.birth_year === 'unknown'
                  ? ''
                  : ` in ${this.state.itemData.birth_year}`}
                {this.state.planetData?.name === 'unknown' ? (
                  'in unknown '
                ) : (
                  <>
                    {' '}
                    in{' '}
                    <Link className="item__link uppercase" to={planetLink}>
                      {this.state.planetData?.name}
                    </Link>
                  </>
                )}{' '}
                planet. <br></br>
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
                <div className={styles.attributes_block}>
                  <p className={styles.attributes_title}>Films</p>
                  <div>{renderLinksFromArray(this.state.filmsData, ['item__link'])}</div>
                </div>
                <div className={styles.attributes_block}>
                  <p className={styles.attributes_title}>Starships</p>
                  <div>{renderLinksFromArray(this.state.starshipsData, ['item__link'])}</div>
                </div>

                <div className={styles.attributes_block}>
                  <p className={styles.attributes_title}>Vehicles</p>
                  <div>{renderLinksFromArray(this.state.vehiclesData, ['item__link'])}</div>
                </div>
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
          <Link
            onClick={() => {
              console.log(this.props);
            }}
            className="button"
            to={`/people/59`}
            // to={''}
          >
            Next
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Person);
