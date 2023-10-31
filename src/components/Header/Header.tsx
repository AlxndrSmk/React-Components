import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { IHeaderProps } from '../../types/types';
import ErrorButton from '../ErrorButton/ErrorButton';

class Header extends React.Component<IHeaderProps> {
  links = [
    { name: 'People', src: '/people' },
    { name: 'Planets', src: '/planets' },
    { name: 'Films', src: '/films' },
    { name: 'Species', src: '/species' },
    { name: 'Vehicles', src: '/vehicles' },
    { name: 'Starships', src: '/starships' },
  ];

  logoHandleClick = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div className={styles.header}>
        <Link className={styles.logo} to="/" onClick={this.logoHandleClick}>
          <img className={styles.logo__img} src="/images/icons/sw_logo.png" />
        </Link>
        <ErrorButton />

        <ul className={styles.menu}>
          {this.links.map((link) => {
            const isActive = this.props.location.pathname === link.src;
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
  }
}

export default Header;
