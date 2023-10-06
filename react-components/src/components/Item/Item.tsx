import React from 'react';
import './Item.scss';
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
        <div className="item__wrapper">
          <div className="item__title">{this.props.data.name}</div>
          <img className="item__img" alt={this.props.data.name} src={imgSrc} />
          <div className="item__weight">Weight: {this.props.data.mass / 10} kg</div>
          <div className="item__height">Height: {this.props.data.height / 100} m</div>
          <div className="item__gender">Gender: {this.props.data.gender}</div>
          <div className="item__birthdate">Date of birth: {this.props.data.birth_year}</div>
          <div className="item__birthdate">Homeworld: {this.props.homeworldData.name}</div>
          <button
            disabled={!this.props.isDisabled}
            onClick={() => this.props.getDataByValue('')}
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
