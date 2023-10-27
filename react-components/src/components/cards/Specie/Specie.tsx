import React from 'react';
import styles from './Specie.module.scss';
import Loader from '../../Loader/Loader';
import withRouter from '../../../routes/withRouter';
import { Link } from 'react-router-dom';
import { IPlanetData, ISpecieData } from '../../../types/types';
import getSpecieData from '../../../services/api/getSpecieData';
import AttributesBlock from '../../AttributesBlock/AttributesBlock';
import hasNoData from '../../../services/hasNoData';
import getPlanetData from '../../../services/api/getPlanetData';

class Specie extends React.Component<ISPecieProps, ISpecieState> {
  constructor(props: ISPecieProps) {
    super(props);

    this.state = {
      specieData: null,
      planetData: null,
    };
  }

  async setInitState() {
    await this.setState({
      specieData: null,
      planetData: null,
    });
  }

  getSpecieData = async (id: string) => {
    const specieData: ISpecieData = await getSpecieData(id);
    const planetData: IPlanetData = await getPlanetData(id);

    await this.setState({ specieData, planetData });
  };

  componentDidMount = async (): Promise<void> => {
    await this.getSpecieData(this.props.params.id);
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setInitState();
      await this.getSpecieData(this.props.params.id);
    }
  };

  render() {
    if (!this.state.specieData) {
      return <Loader />;
    }

    if (this.state.specieData) {
      console.log(this.state.specieData);
      const specieId: string = this.state.specieData.url.match(/\d+/)![0];
      const specieImgSrc: string = `/images/species/${specieId}.jpg`;
      const planetLink: string = '/' + this.state.planetData?.url.split('/').slice(4).join('/');

      return (
        <div className={styles.item__wrapper}>
          <div className={styles.item__container}>
            <div className={styles.item__container_left}>
              <h1 className={styles.item__title}>{this.state.specieData.name}</h1>
              <div>
                {hasNoData(this.state.planetData.name) || (
                  <>
                    <p className="inline">Planet: </p>
                    <Link className="item__link uppercase inline" to={planetLink}>
                      {this.state.planetData?.name}
                    </Link>
                  </>
                )}
                {hasNoData(this.state.specieData.classification) || (
                  <p>Classification: {this.state.specieData.classification}</p>
                )}
                {hasNoData(this.state.specieData.designation) || (
                  <p>Designation: {this.state.specieData.designation}</p>
                )}
                {hasNoData(this.state.specieData.average_height) || (
                  <p>Average height: {Number(this.state.specieData.average_height) / 100} m</p>
                )}
                {hasNoData(this.state.specieData.skin_colors) || (
                  <p>Skin colors: {this.state.specieData.skin_colors}</p>
                )}
                {hasNoData(this.state.specieData.hair_colors) || (
                  <p>Hair colors: {this.state.specieData.hair_colors}</p>
                )}
                {hasNoData(this.state.specieData.eye_colors) || (
                  <p>Eye colors: {this.state.specieData.eye_colors}</p>
                )}
                {hasNoData(this.state.specieData.language) || (
                  <p>Language: {this.state.specieData.language}</p>
                )}
              </div>
              <div className={styles.attributes_container}>
                {!!this.state.specieData.films.length && (
                  <AttributesBlock
                    data={this.state.specieData.films}
                    classNames={['item__link']}
                    title="Films"
                  />
                )}
                {!!this.state.specieData.people.length && (
                  <AttributesBlock
                    data={this.state.specieData.people}
                    classNames={['item__link']}
                    title="People"
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
              alt={this.state.specieData.name}
              src={specieImgSrc}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Specie);
