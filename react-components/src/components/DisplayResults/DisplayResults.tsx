import React from 'react';
import './DisplayResults.scss';
import Loader from '../Loader/Loader';

class DisplayResults extends React.Component {
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
                <div
                  key={data.name}
                  onClick={() => this.props.getItemData(data.url)}
                  className="item__wrapper"
                >
                  <div className="item__img__wrapper">
                    <img className="item__img" src={imgSrc} alt={data.name} />
                  </div>
                  {data.name}
                </div>
              );
            })}
          </div>
          <div className="buttons">
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

export default DisplayResults;
