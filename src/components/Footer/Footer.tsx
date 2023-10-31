import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { IFooterLink } from '../../types/types';

class Footer extends React.Component {
  links: IFooterLink[] = [
    {
      name: 'Github',
      src: 'https://github.com/AlxndrSmk',
      path: '/images/icons/svg/github.svg',
      width: '40',
    },
    {
      name: 'RSSchool',
      src: 'https://rs.school/js/',
      path: '/images/icons/svg/rs_school_js.svg',
      width: '80',
    },
  ];

  render() {
    return (
      <div className={styles.footer_container}>
        <p className={styles.footer_copyright}> © 2023 Alexander Samak</p>
        {this.links.map((link) => {
          return (
            <Link key={link.name} to={link.src} className={styles.footer_icon} target="blank">
              <img src={link.path} alt={link.name} width={link.width} />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Footer;
