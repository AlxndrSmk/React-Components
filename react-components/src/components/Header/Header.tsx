import Link from 'next/link';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/people">
        <img className={styles.logo__img} alt="StarWars" src="/images/icons/sw_logo.png" />
      </Link>
    </div>
  );
};

export default Header;
