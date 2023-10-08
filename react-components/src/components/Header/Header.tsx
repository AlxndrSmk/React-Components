import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

class Header extends React.Component {
  render() {
    const links = [
      { name: 'People', src: '/' },
      { name: 'Planets', src: '' },
      { name: 'Films', src: '' },
      { name: 'Species', src: '' },
      { name: 'Vehicles', src: '' },
      { name: 'Starships', src: '' },
    ];

    return (
      <div className={styles.header}>
        <Link className={styles.logo} to="/">
          <img className={styles.logo__img} src="/images/icons/sw_logo.png" />
        </Link>
        <ul className={styles.menu}>
          {links.map((link) => {
            return (
              <Link key={link.name} to={link.src}>
                <li className={styles.menu__item}>{link.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Header;
