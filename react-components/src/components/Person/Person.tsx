import React, { ReactNode } from 'react';
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
  // IFilmData,
  ISpecieData,
  IStarshipData,
  IFilmData,
  IVehicleData,
  // IVehicleData,
} from '../../types/types';
import getPersonData from '../../services/api/getPersonData';
import AttributesBlock from '../AttributesBlock/AttributesBlock';

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

  renderArrayData = (data): ReactNode => {
    const items = data.map((item) => {
      const link: string = '/' + item.url.split('/').slice(4).join('/');

      return (
        <Link key={item.title} to={link}>
          <li>{item.name || item.title}</li>
        </Link>
      );
    });

    console.log(items);
    return items;
  };

  getPersonData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);

    const filmsData: IFilmData[] = await this.getArrayData(itemData.films);
    const speciesData: ISpecieData[] = await this.getArrayData(itemData.species);
    const starshipsData: IStarshipData[] = await this.getArrayData(itemData.starships);
    const vehiclesData: IVehicleData[] = await this.getArrayData(itemData.vehicles);

    this.setState({
      personData: itemData,
      planetData,
      filmsData,
      speciesData,
      starshipsData,
      vehiclesData,
      isDataLoaded: true,
    });
  };

  render() {
    if (!this.state.personData) {
      return <Loader />;
    }

    if (this.state.personData) {
      console.log(this.state.personData);
      console.log(this.state.filmsData);

      console.log(this.state.speciesData);
      console.log(this.state.vehiclesData);

      const personId: string = this.state.personData.url.match(/\d+/)![0];
      const peopleImgSrc: string = `/images/people/${personId}.jpg`;
      const planetLink: string = '/' + this.state.planetData?.url.split('/').slice(4).join('/');

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h3 className={styles.item__title}>{this.state.personData.name}</h3>
              <p>
                {this.state.personData.name} was born
                {this.state.personData.birth_year === 'unknown'
                  ? ''
                  : ` in ${this.state.personData.birth_year}`}
                {this.state.planetData?.name === 'unknown' ? (
                  'in unknown '
                ) : (
                  <>
                    {' '}
                    in <Link to={planetLink}>{this.state.planetData?.name}</Link>
                  </>
                )}{' '}
                planet. <br></br>
                {this.state.personData.gender === 'male'
                  ? 'He'
                  : this.state.personData.gender === 'female'
                  ? 'She'
                  : 'It'}{' '}
                has {this.state.personData.eye_color} eyes and{' '}
                {this.state.personData.hair_color === 'n/a' ||
                this.state.personData.hair_color === 'none'
                  ? 'no hair'
                  : `${this.state.personData.hair_color} hair`}
                {'.'}
              </p>
              <div className={styles.attributes_container}>
                <div className={styles.attributes_block}>
                  <p className={styles.attributes_title}>Films</p>
                  <ul>{this.renderArrayData(this.state.filmsData)}</ul>
                </div>
                <div className={styles.attributes_block}>
                  <p className={styles.attributes_title}>Body parameters</p>
                  {!isNaN(+this.state.personData.mass) && (
                    <p>Mass: {+this.state.personData.mass / 10} kg</p>
                  )}
                  <p>Height: {+this.state.personData.height / 100} m</p>
                  <p>Skin color: {this.state.personData.skin_color}</p>
                </div>
                {!this.state.speciesData.lenght && (
                  <AttributesBlock
                    blockTitle="Species"
                    renderArrayData={this.renderArrayData}
                    data={this.state.speciesData}
                  />
                )}
                {!this.state.starshipsData.lenght && (
                  <AttributesBlock
                    blockTitle="Starships"
                    renderArrayData={this.renderArrayData}
                    data={this.state.starshipsData}
                  />
                )}
                {!this.state.vehiclesData.lenght && (
                  <AttributesBlock
                    blockTitle="Vehicles"
                    renderArrayData={this.renderArrayData}
                    data={this.state.vehiclesData}
                  />
                )}
              </div>
            </div>
            <div className={styles.item__container_right}>
              <img
                className={styles.item__img}
                alt={this.state.personData.name}
                src={peopleImgSrc}
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

export default withRouter(Person);
