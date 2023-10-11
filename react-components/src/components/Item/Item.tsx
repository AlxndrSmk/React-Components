import React from 'react';
import styles from './Item.module.scss';
import Loader from '../Loader/Loader';
import getDataByLink from '../../services/api/getDataByLink';
import withRouter from '../../routes/withRouter';
import { Link } from 'react-router-dom';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    await this.getItemData(this.props.params.id);
  };

  getItemData = async (value) => {
    const itemData = await getDataByLink(`https://swapi.dev/api/people/${value}`);
    const homeworldData = await getDataByLink(itemData.homeworld);
    this.setState({ data: itemData, homeworldData, isDataLoaded: true });
  };

  render() {
    if (!this.state.data) {
      return <Loader />;
    }

    if (this.state.data) {
      console.log(this.state.data);
      console.log(this.state.homeworldData);
      console.log(this.state);

      const imgSrc = `/images/items/${parseInt(this.state.data.url.match(/\d+/))}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__title}>{this.state.data.name}</div>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <p className={styles.item__birthdate}>Birth year: {this.state.data.birth_year}</p>
              <p className={styles.item__eyeColor}>Eye color: {this.state.data.eye_color}</p>
              <p className={styles.item__gender}>Gender: {this.state.data.gender}</p>
              <p className={styles.item__hairColor}>Hair color: {this.state.data.hair_color}</p>
              <p className={styles.item__weight}>Mass: {this.state.data.mass / 10} kg</p>
              <p className={styles.item__height}>Height: {this.state.data.height / 100} m</p>
            </div>
            <div className={styles.item__container_right}>
              <img className={styles.item__img} alt={this.state.data.name} src={imgSrc} />
              <p className={styles.item__birthdate}>Homeworld: {this.state.homeworldData.name}</p>
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

export default withRouter(Item);
