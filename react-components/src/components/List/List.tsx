import React from 'react';
import './List.scss';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { IListProps, IListState } from '../../types/types';
import SearchInput from '../SearchInput/SearchInput';
import withRouter from '../../routes/withRouter';

class List extends React.Component<IListProps, IListState> {
  render() {
    if (!this.props.isDataLoaded) {
      return <Loader />;
    }

    if (this.props.isDataLoaded) {
      return (
        <>
          <SearchInput handleSubmit={this.props.handleSubmit} />
          <div className="items__wrapper">
            {this.props.listData?.results?.length ? (
              this.props.listData.results?.map((data) => {
                const imgSrc = `/images/${this.props.pathName}/${parseInt(
                  data.url?.match(/\d+/)
                )}.jpg`;
                return (
                  <Link
                    key={data.name || data.title}
                    to={`/${this.props.pathName}/${parseInt(data.url?.match(/\d+/))}`}
                    className="item__wrapper"
                    state={this.props.listData}
                  >
                    <div className="item__img__wrapper">
                      <figure className="item__text_effect">
                        <img
                          onError={({ currentTarget }) => {
                            console.clear();
                            currentTarget.onerror = null;
                            currentTarget.src = '/images/png/img_not_found.png';
                          }}
                          className="item__img"
                          src={imgSrc}
                          alt={data.name}
                        />
                        <figcaption className="item__figcaption">
                          <p className="item__img__title">{data.name || data.title}</p>
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
            <button
              className="button"
              onClick={this.props.decrementPage}
              disabled={!this.props.listData?.previous}
            >
              Prev
            </button>
            <button
              className="button"
              onClick={this.props.incrementPage}
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

export default withRouter(List);
