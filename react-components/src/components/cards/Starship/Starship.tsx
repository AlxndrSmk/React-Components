import React from 'react';
import styles from './Starship.module.scss';
import Loader from '../../Loader/Loader';
import withRouter from '../../../routes/withRouter';
import { ISpecieData } from '../../../types/types';
import getStarshipData from '../../../services/api/getStarshipData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

class Starship extends React.Component<IStarshipProps, IStarshipState> {
  constructor(props: IStarshipProps) {
    super(props);

    this.state = {
      starshipData: null,
    };
  }

  async setInitState() {
    await this.setState({
      starshipData: null,
    });
  }

  getStarshipData = async (id: string) => {
    const starshipData: ISpecieData = await getStarshipData(id);
    await this.setState({ starshipData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getStarshipData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getStarshipData(this.props.params.id);
    }
  };

  render() {
    if (!this.state.starshipData) {
      return <Loader />;
    }

    if (this.state.starshipData) {
      console.log(this.state.starshipData);
      const starshipId: string = this.state.starshipData.url.match(/\d+/)![0];
      const starshipImgSrc: string = `/images/starships/${starshipId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.starshipData.name}</h1>
              <div>
                {hasNoData(this.state.starshipData.hyperdrive_rating) || (
                  <p>Hyperdrive rating: {this.state.starshipData.hyperdrive_rating} / 5</p>
                )}
                {hasNoData(this.state.starshipData.model) || (
                  <p>Model: {this.state.starshipData.model}</p>
                )}
                {hasNoData(this.state.starshipData.manufacturer) || (
                  <p>Manufacturer: {this.state.starshipData.manufacturer}</p>
                )}
                {hasNoData(this.state.starshipData.starship_class) || (
                  <p>Class: {this.state.starshipData.starship_class}</p>
                )}
                {hasNoData(this.state.starshipData.cost_in_credits) || (
                  <p>
                    Cost: {Number(this.state.starshipData.cost_in_credits).toLocaleString()} credits
                  </p>
                )}
                {hasNoData(this.state.starshipData.length) || (
                  <p>Length: {this.state.starshipData.length} m</p>
                )}
                {hasNoData(this.state.starshipData.max_atmosphering_speed) || (
                  <p>
                    Max atmosphering speed:{' '}
                    {Number(this.state.starshipData.max_atmosphering_speed).toLocaleString()} km/h
                  </p>
                )}
                {hasNoData(this.state.starshipData.crew) || (
                  <p>Crew: {this.state.starshipData.crew}</p>
                )}
                {hasNoData(this.state.starshipData.passengers) || (
                  <p>Passengers: {this.state.starshipData.passengers}</p>
                )}
                {hasNoData(this.state.starshipData.cargo_capacity) || (
                  <p>
                    Cargo capacity:{' '}
                    {Number(this.state.starshipData.cargo_capacity).toLocaleString()} kg
                  </p>
                )}
                {hasNoData(this.state.starshipData.consumables) || (
                  <p>Consumables: {this.state.starshipData.consumables}</p>
                )}
                {hasNoData(this.state.starshipData.MGLT) || (
                  <p>Maximum number of Megalights: {this.state.starshipData.MGLT}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.starshipData.films.length && (
                  <AttributesBlock
                    data={this.state.starshipData.films}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.starshipData.pilots.length && (
                  <AttributesBlock
                    data={this.state.starshipData.pilots}
                    classNames={['item__link']}
                    title="Pilots"
                  />
                )}
              </div>
            </div>
            <img
              className={styles.item__img}
              onError={({ currentTarget }) => {
                console.clear();
                currentTarget.onerror = null;
                currentTarget.src = '/images/png/img_not_found.png';
                currentTarget.style.width = '400px';
              }}
              alt={this.state.starshipData.name}
              src={starshipImgSrc}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Starship);
