import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { footerLinks } from '../../constants';

const Footer: React.FC = () => (
  <div className={styles.footer_container}>
    <p className={styles.footer_copyright}> © 2023 Alexander Samak</p>
    {footerLinks.map((link) => {
      return (
        <Link key={link.name} to={link.src} className={styles.footer_icon} target="blank">
          <img src={link.path} alt={link.name} width={link.width} />
        </Link>
      );
    })}
  </div>
);

export default Footer;
