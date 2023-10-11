import React from 'react';
import styles from './Person.module.scss';
import Loader from '../Loader/Loader';
import getDataByLink from '../../services/api/getDataByLink';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPersonProps, IPersonState, IHomeWorldData } from '../../types/types';

class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      personData: null,
      homeworldData: null,
      isDataLoaded: false,
    };
  }

  componentDidMount = async (): Promise<void> => {
    console.log(JSON.stringify(this.props));
    await this.getItemData(this.props.params.id);
  };

  getItemData = async (value: string) => {
    console.log(typeof value);
    const itemData = await getDataByLink(`https://swapi.dev/api/people/${value}`);
    const homeworldData: IHomeWorldData = await getDataByLink(itemData.homeworld);
    console.log(JSON.stringify(homeworldData));
    this.setState({ personData: itemData, homeworldData, isDataLoaded: true });
  };

  render() {
    if (!this.state.personData) {
      return <Loader />;
    }

    if (this.state.personData) {
      console.log(this.state.personData);
      console.log(this.state.homeworldData);

      const personId: string = this.state.personData.url.match(/\d+/)![0];
      const imgSrc = `/images/items/${personId}.jpg`;

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
              <p className={styles.item__birthdate}>Homeworld: {this.state.homeworldData?.name}</p>
            </div>
          </div>
          <Link to={`/`} className="button button__back">
            Back to menu
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Person);
