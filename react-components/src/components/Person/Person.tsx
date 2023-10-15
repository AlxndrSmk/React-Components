import React from 'react';
import styles from './Person.module.scss';
import Loader from '../Loader/Loader';
import getDataByLink from '../../services/api/getDataByLink';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPersonProps, IPersonState, IPersonData, IPlanetData } from '../../types/types';
import getPersonData from '../../services/api/getPersonData';

class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      personData: null,
      planetData: null,
      isDataLoaded: false,
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.getItemData(this.props.params.id);
  };

  getItemData = async (id: string) => {
    const itemData: IPersonData = await getPersonData(id);
    const planetData: IPlanetData = await getDataByLink(itemData.homeworld);
    this.setState({ personData: itemData, planetData, isDataLoaded: true });
    console.log(planetData);
  };

  render() {
    if (!this.state.personData) {
      return <Loader />;
    }

    if (this.state.personData) {
      console.log(this.state.personData);
      console.log(this.state.planetData);

      const personId: string = this.state.personData.url.match(/\d+/)![0];
      const imgSrc = `/images/people/${personId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__title}>{this.state.personData.name}</div>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <p className={styles.item__birthdate}>
                Birth year: {this.state.personData.birth_year}
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
              <img className={styles.item__img} alt={this.state.personData.name} src={imgSrc} />
              <p className={styles.item__birthdate}>Homeworld: {this.state.planetData?.name}</p>
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
