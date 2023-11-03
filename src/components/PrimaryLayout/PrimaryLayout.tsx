import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import styles from './PrimaryLayout.module.scss';

const PrimaryLayout: React.FC = () => {
  const location = useLocation();

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

export default PrimaryLayout;
