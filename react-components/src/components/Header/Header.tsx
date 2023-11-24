import Link from 'next/link';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const handleLogoClick = (): void => {
    localStorage.clear();
  };

  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/" onClick={handleLogoClick}>
        <img className={styles.logo__img} alt="StarWars" src="/images/icons/sw_logo.png" />
      </Link>
    </div>
  );
};

export default Header;
