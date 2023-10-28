import React from 'react';
import './List.scss';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { IFilmData, IListProps, IListState, TAllCardsDataWithName } from '../../types/types';
import SearchInput from '../SearchInput/SearchInput';
import withRouter from '../../routes/withRouter';

class List extends React.Component<IListProps, IListState> {
  render() {
    console.log(this.props);
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
                const listId: string = data.url.replace(/[^0-9]/g, '');
                const imgSrc = `/images/${this.props.pathName}/${listId}.jpg`;
                return (
                  <Link
                    key={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                    to={`/${this.props.pathName}/${data.url.replace(/[^0-9]/g, '')}`}
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
                          alt={(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                        />
                        <figcaption className="item__figcaption">
                          <p className="item__img__title">
                            {(data as TAllCardsDataWithName).name || (data as IFilmData).title}
                          </p>
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
