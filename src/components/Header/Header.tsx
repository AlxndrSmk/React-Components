import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { IHeaderProps } from '../../types/types';
import { headerLinks } from '../../constants';

const Header: React.FC<IHeaderProps> = ({ location }) => {
  const handleLogoClick = (): void => {
    localStorage.clear();
  };

  return (
    <div className={styles.header}>
      <Link className={styles.logo} to="/" onClick={handleLogoClick}>
        <img className={styles.logo__img} src="/images/icons/sw_logo.png" />
      </Link>

      <ul className={styles.menu}>
        {headerLinks.map((link) => {
          const isActive = location.pathname === link.src;
          return (
            <Link
              key={link.name}
              to={link.src}
              className={`${styles.menu__item} ${isActive ? styles.active : ''}`}
            >
              <li>{link.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
