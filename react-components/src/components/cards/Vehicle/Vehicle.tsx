import React from 'react';
import styles from './Vehicle.module.scss';
import Loader from '../../Loader/Loader';
import withRouter from '../../../routes/withRouter';
import { Link } from 'react-router-dom';
import { ISpecieData } from '../../../types/types';
import getVehicleData from '../../../services/api/getVehicleData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

class Vehicle extends React.Component<IVehicleProps, IVehicleState> {
  constructor(props: IVehicleProps) {
    super(props);

    this.state = {
      vehicleData: null,
    };
  }

  async setInitState() {
    await this.setState({
      vehicleData: null,
    });
  }

  getVehicleData = async (id: string) => {
    const vehicleData: ISpecieData = await getVehicleData(id);
    await this.setState({ vehicleData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getVehicleData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getVehicleData(this.props.params.id);
    }
  };

  render() {
    if (!this.state.vehicleData) {
      return <Loader />;
    }

    if (this.state.vehicleData) {
      console.log(this.state.vehicleData);
      const vehicleId: string = this.state.vehicleData.url.match(/\d+/)![0];
      const vehicleImgSrc: string = `/images/vehicles/${vehicleId}.jpg`;

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.vehicleData.name}</h1>
              <div>
                {hasNoData(this.state.vehicleData.model) || (
                  <p>Model: {this.state.vehicleData.model}</p>
                )}
                {hasNoData(this.state.vehicleData.manufacturer) || (
                  <p>Manufacturer: {this.state.vehicleData.manufacturer}</p>
                )}
                {hasNoData(this.state.vehicleData.cost_in_credits) || (
                  <p>
                    Cost: {Number(this.state.vehicleData.cost_in_credits).toLocaleString()} credits
                  </p>
                )}
                {hasNoData(this.state.vehicleData.length) || (
                  <p>Length: {this.state.vehicleData.length} m</p>
                )}
                {hasNoData(this.state.vehicleData.crew) || (
                  <p>Crew: {this.state.vehicleData.crew}</p>
                )}
                {hasNoData(this.state.vehicleData.passengers) || (
                  <p>Passengers: {this.state.vehicleData.passengers}</p>
                )}
                {hasNoData(this.state.vehicleData.cargo_capacity) || (
                  <p>
                    Cargo capacity: {Number(this.state.vehicleData.cargo_capacity).toLocaleString()}{' '}
                    kg
                  </p>
                )}
                {hasNoData(this.state.vehicleData.consumables) || (
                  <p>Consumables: {this.state.vehicleData.consumables}</p>
                )}
                {hasNoData(this.state.vehicleData.vehicle_class) || (
                  <p>Vehicle class: {this.state.vehicleData.vehicle_class}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.vehicleData.films.length && (
                  <AttributesBlock
                    data={this.state.vehicleData.films}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.vehicleData.pilots.length && (
                  <AttributesBlock
                    data={this.state.vehicleData.pilots}
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
              alt={this.state.vehicleData.name}
              src={vehicleImgSrc}
            />
          </div>
          <Link
            onClick={() => {
              this.props.navigate(-1);
            }}
            className="button"
            to={''}
          >
            Back to search
          </Link>
        </div>
      );
    }
  }
}

export default withRouter(Vehicle);
