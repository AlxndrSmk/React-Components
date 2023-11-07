import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const handleLogoClick = (): void => {
    localStorage.clear();
  };

  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/" onClick={handleLogoClick}>
        <img className={styles.logo__img} src="/images/icons/sw_logo.png" />
      </Link>
    </div>
  );
};

export default Header;
