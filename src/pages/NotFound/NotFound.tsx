import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>You lost your own way</p>
      <p className={styles.description}>my son</p>
      <img className={styles.img} src="/images/png/darth_vader.png" alt="Darth Vaider" />
      <Link className="button" to="/">
        Go to main
      </Link>
    </>
  );
};

export default NotFound;
