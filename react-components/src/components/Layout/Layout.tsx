import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { LayoutProps } from '@/types/types';

import styles from './Layout.module.scss';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className="section__bottom">{children}</div>
      <div className={styles.twinkling}></div>
      <Footer />
    </div>
  );
};

export default Layout;
