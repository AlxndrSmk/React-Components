import Link from 'next/link';
import Image from 'next/image';

import styles from './Footer.module.scss';
import { footerLinks } from '@/utils/constatnts';

const Footer: React.FC = () => (
  <div className={styles.footer_container}>
    <p className={styles.footer_copyright}> © 2023 Alexander Samak</p>
    {footerLinks.map((link) => {
      return (
        <Link key={link.name} href={link.src} className={styles.footer_icon} target="blank">
          <div className="relative">
            <Image src={link.path} alt={link.name} fill={true} />
          </div>
        </Link>
      );
    })}
  </div>
);

export default Footer;
