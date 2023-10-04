import React from 'react';
import './DisplayResults.scss';

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

  handleUrlClick = (e) => {
    console.log(e);
    this.props.getDataByLink(e);
  };

  render() {
    // TODO: loader
    if (!this.props.data) {
      return <div>No data to display</div>;
    }

    if (this.props.data.results) {
      console.log('the data has arrived');
      console.log(this.props.data);

      return (
        <>
          <ul className="data-list">
            {this.props.data.results.map((data) => {
              return (
                <li
                  key={data.name}
                  onClick={() => this.handleUrlClick(data.url)}
                  className="data-list__item"
                >
                  {data.name}
                </li>
              );
            })}
          </ul>
          <div className="buttons">
            <button
              className="button button__prev"
              onClick={() => this.handleUrlClick(this.props.data.previous)}
              disabled={!this.props.data.previous}
            >
              Prev
            </button>
            <button
              className="button button__next"
              onClick={() => this.handleUrlClick(this.props.data.next)}
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
