import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './PrimaryLayout.module.scss';

const PrimaryLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <Header location={location} />
      <div className="section__bottom">
        <Outlet />
      </div>
      <div className={styles.twinkling}></div>
      <Footer />
    </div>
  );
};

export default PrimaryLayout;
