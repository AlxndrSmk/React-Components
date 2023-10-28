import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import styles from './PrimaryLayout.module.scss';
import Footer from '../Footer/Footer';
import { WithRouterProps } from '../../types/types';

class PrimaryLayout extends React.Component<WithRouterProps> {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className="section__bottom">
          <Outlet />
        </div>
        <div className={styles.twinkling}></div>
        <Footer />
      </div>
    );
  }
}

export default PrimaryLayout;
