import React from 'react';
import './Pokemon.scss';
import Loader from '../Loader/Loader';

class Pokemon extends React.Component {
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
      console.log(this.props.data);

      return (
        <div className="pokemon">
          <div className="pokemon__name">{this.props.data.name}</div>
          <img
            className="pokemon__img"
            alt={this.props.data.name}
            src={this.props.data.sprites.other.home.front_default}
          />
          <button onClick={() => this.props.getDataByValue('')} className="button button__back">
            Back to pokemons
          </button>
        </div>
      );
    }
  }
}

export default Pokemon;
