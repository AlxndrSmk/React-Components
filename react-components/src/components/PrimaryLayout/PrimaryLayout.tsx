import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import styles from './PrimaryLayout.module.scss';

class PrimaryLayout extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <Outlet />
      </div>
    );
  }
}

export default PrimaryLayout;
