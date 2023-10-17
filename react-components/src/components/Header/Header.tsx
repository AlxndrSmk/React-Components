import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import withRouter from '../../routes/withRouter';

class Header extends React.Component {
  logoHandleClick = () => {
    localStorage.clear();
  };

  render() {
    const links = [
      { name: 'People', src: '/people' },
      { name: 'Planets', src: '/planets' },
      { name: 'Films', src: '/films' },
      { name: 'Species', src: '/species' },
      { name: 'Vehicles', src: '/vehicles' },
      { name: 'Starships', src: '/starships' },
    ];

    return (
      <div className={styles.header}>
        <Link className={styles.logo} to="/" onClick={this.logoHandleClick}>
          <img className={styles.logo__img} src="/images/icons/sw_logo.png" />
        </Link>
        <ul className={styles.menu}>
          {links.map((link) => {
            const isActive = this.props.location.pathname === link.src;
            return (
              <Link
                key={link.name}
                to={link.src}
                className={`${styles.menu__item} ${isActive ? styles.active : ''}`}
                onClick={(e) => console.log(e.target)}
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

export default withRouter(Header);
