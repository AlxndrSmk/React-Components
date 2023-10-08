import React from 'react';
import './List.scss';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

class List extends React.Component {
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
    if (!this.props.isDataLoaded) {
      return <Loader />;
    }

    if (this.props.isDataLoaded) {
      console.log('the data has arrived');
      console.log(this.props.data);

      return (
        <>
          <div className="items__wrapper">
            {this.props.data.results.map((data) => {
              const imgSrc = `/images/items/${parseInt(data.url.match(/\d+/))}.jpg`;

              return (
                <Link
                  key={data.name}
                  to={`item/${parseInt(data.url.match(/\d+/))}`}
                  className="item__wrapper"
                >
                  <div className="item__img__wrapper">
                    <figure className="item__text_effect">
                      <img className="item__img" src={imgSrc} alt={data.name} />
                      <figcaption className="item__figcaption">
                        <p className="item__img__title">{data.name}</p>
                      </figcaption>
                    </figure>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="buttons">
            <div className="hui"></div>
            <button
              className="button button__prev"
              onClick={() => this.props.getPageData(this.props.data.previous)}
              disabled={!this.props.data.previous}
            >
              Prev
            </button>
            <button
              className="button button__next"
              onClick={() => this.props.getPageData(this.props.data.next)}
              disabled={!this.props.data.next}
            >
              Next
            </button>
          </div>
        </>
      );
    }
  }
}

export default List;
