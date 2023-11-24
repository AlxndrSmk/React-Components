import Link from 'next/link';
import styles from '../styles/Page404.module.scss';

const Page404: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>You lost your own way</p>
      <p className={styles.description}>my son</p>
      <img className={styles.img} src="/images/png/darth_vader.png" alt="Darth Vaider" />
      <Link className="button" href="/">
        Go to main
      </Link>
    </>
  );
};

export default Page404;
