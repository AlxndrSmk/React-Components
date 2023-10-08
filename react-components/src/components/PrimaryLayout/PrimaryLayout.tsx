import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import styles from './PrimaryLayout.module.scss';

class PrimaryLayout extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className="section__bottom">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default PrimaryLayout;
