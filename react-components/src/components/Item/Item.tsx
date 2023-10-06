import React from 'react';
import styles from './Item.module.scss';
import Loader from '../Loader/Loader';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    if (!this.props.data) {
      return <Loader />;
    }

    if (this.props.data) {
      console.log('the data has arrived');
      console.log(this.props.data);
      console.log(this.props.homeworldData);

      const imgSrc = `/images/items/${parseInt(this.props.data.url.match(/\d+/))}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__title}>{this.props.data.name}</div>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <p className={styles.item__birthdate}>Birth year: {this.props.data.birth_year}</p>
              <p className={styles.item__eyeColor}>Eye color: {this.props.data.eye_color}</p>
              <p className={styles.item__gender}>Gender: {this.props.data.gender}</p>
              <p className={styles.item__hairColor}>Hair color: {this.props.data.hair_color}</p>
              <p className={styles.item__weight}>Mass: {this.props.data.mass / 10} kg</p>
              <p className={styles.item__height}>Height: {this.props.data.height / 100} m</p>
            </div>
            <div className={styles.item__container_right}>
              <img className={styles.item__img} alt={this.props.data.name} src={imgSrc} />
              <p className={styles.item__birthdate}>Homeworld: {this.props.homeworldData.name}</p>
            </div>
          </div>

          <button
            disabled={!this.props.isDisabled}
            onClick={() => this.props.getDataByValue(`&page=${this.props.currentPage}`)}
            className="button button__back"
          >
            Back to menu
          </button>
        </div>
      );
    }
  }
}

export default Item;
