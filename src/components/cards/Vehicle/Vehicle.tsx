import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Vehicle.module.scss';
import Loader from '../../Loader/Loader';
import { IVehicleData } from '../../../types/types';
import getVehicleData from '../../../services/api/getVehicleData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';

const Vehicle: React.FC = () => {
  const params = useParams();
  const [vehicleData, setVehicleData] = useState<null | IVehicleData>(null);

  const fetchVehicleData = async (id: string) => {
    const vehicleData: IVehicleData = await getVehicleData(id);
    await setVehicleData(vehicleData);
  };

  useEffect(() => {
    fetchVehicleData(params.id as string);
  }, [params.id]);

  if (!vehicleData) {
    return <Loader />;
  }

  if (vehicleData) {
    const vehicleId: string = vehicleData.url.replace(/[^0-9]/g, '');
    const vehicleImgSrc: string = `/images/vehicles/${vehicleId}.jpg`;

    return (
      <div className={styles.item__wrapper}>
        <div className={styles.item__container}>
          <div className={styles.item__container_left}>
            <h1 className={styles.item__title}>{vehicleData.name}</h1>
            <div>
              {hasNoData(vehicleData.model) || <p>Model: {vehicleData.model}</p>}
              {hasNoData(vehicleData.manufacturer) || (
                <p>Manufacturer: {vehicleData.manufacturer}</p>
              )}
              {hasNoData(vehicleData.cost_in_credits) || (
                <p>Cost: {Number(vehicleData.cost_in_credits).toLocaleString()} credits</p>
              )}
              {hasNoData(vehicleData.length) || <p>Length: {vehicleData.length} m</p>}
              {hasNoData(vehicleData.crew) || <p>Crew: {vehicleData.crew}</p>}
              {hasNoData(vehicleData.passengers) || <p>Passengers: {vehicleData.passengers}</p>}
              {hasNoData(vehicleData.cargo_capacity) || (
                <p>Cargo capacity: {Number(vehicleData.cargo_capacity).toLocaleString()} kg</p>
              )}
              {hasNoData(vehicleData.consumables) || <p>Consumables: {vehicleData.consumables}</p>}
              {hasNoData(vehicleData.vehicle_class) || (
                <p>Vehicle class: {vehicleData.vehicle_class}</p>
              )}
            </div>
            <div className={styles.attributes_container}>
              {!!vehicleData.films.length && (
                <AttributesBlock
                  data={vehicleData.films}
                  classNames={['item__link']}
                  title="Films"
                />
              )}
              {!!vehicleData.pilots.length && (
                <AttributesBlock
                  data={vehicleData.pilots}
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
            alt={vehicleData.name}
            src={vehicleImgSrc}
          />
        </div>
      </div>
    );
  }
};

export default Vehicle;
