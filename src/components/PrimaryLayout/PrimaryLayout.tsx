import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import styles from './PrimaryLayout.module.scss';
import Footer from '../Footer/Footer';
import { RouterProps } from '../../types/types';
import withRouter from '../../utils/withRouter';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';

const PrimaryLayout: React.FC<RouterProps> = ({ location }) => {
  return (
    <ErrorBoundary key={location.pathname}>
      <div className={styles.wrapper}>
        <Header location={location} />
        <div className="section__bottom">
          <Outlet />
        </div>
        <div className={styles.twinkling}></div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default withRouter<RouterProps>(PrimaryLayout);
