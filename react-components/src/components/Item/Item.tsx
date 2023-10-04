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

      const imgSrc = `/images/items/${parseInt(this.props.data.url.match(/\d+/))}.jpg`;

      return (
        <div className="item__wrapper">
          <div className="item__title">{this.props.data.name}</div>
          <img className="item__img" alt={this.props.data.name} src={imgSrc} />
          <div className="item__weight">Weight: {this.props.data.mass / 10} kg</div>

          <button onClick={() => this.props.getDataByValue('')} className="button button__back">
            Back to menu
          </button>
        </div>
      );
    }
  }
}

export default Item;
