import React from 'react';
import './List.scss';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { IListData } from '../../types/types';
// import { IPersonData } from '../../types/types';

interface IListProps {
  incrementPage: () => void;
  decrementPage: () => void;
  isDataLoaded: boolean;
  listData: IListData;
}

interface IListState {}

class List extends React.Component<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);

    this.state = {
      data: null,
    };
  }

  increment = () => {
    this.props.incrementPage();
  };

  decrement = () => {
    this.props.decrementPage();
  };

  render() {
    if (!this.props.isDataLoaded) {
      return <Loader />;
    }

    if (this.props.isDataLoaded) {
      return (
        <>
          <div className="items__wrapper">
            {this.props.listData?.results?.length ? (
              this.props.listData.results?.map((data) => {
                const imgSrc = `/images/items/${parseInt(data.url?.match(/\d+/))}.jpg`;

                return (
                  <Link
                    key={data.name}
                    to={`person/${parseInt(data.url?.match(/\d+/))}`}
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
              })
            ) : (
              <div>No data found</div>
            )}
          </div>
          <div className="buttons">
            <div className="hui"></div>
            <button
              className="button button__prev"
              onClick={this.decrement}
              disabled={!this.props.listData?.previous}
            >
              Prev
            </button>
            <button
              className="button button__next"
              onClick={this.increment}
              disabled={!this.props.listData?.next}
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
