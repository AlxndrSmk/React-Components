import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import styles from './PrimaryLayout.module.scss';
import Footer from '../Footer/Footer';
import { RouterProps } from '../../types/types';
import withRouter from '../../utils/withRouter';

class PrimaryLayout extends React.Component<RouterProps> {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header location={this.props.location} />
        <div className="section__bottom">
          <Outlet />
        </div>
        <div className={styles.twinkling}></div>
        <Footer />
      </div>
    );
  }
}

export default withRouter<RouterProps>(PrimaryLayout);
