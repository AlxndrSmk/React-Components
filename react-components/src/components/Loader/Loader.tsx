import clsx from 'clsx';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div id="loader" data-testid="loader">
      <div className={clsx(styles.lsParticles, styles.lsPart1)}></div>
      <div className={clsx(styles.lsParticles, styles.lsPart2)}></div>
      <div className={clsx(styles.lsParticles, styles.lsPart3)}></div>
      <div className={clsx(styles.lsParticles, styles.lsPart4)}></div>
      <div className={clsx(styles.lsParticles, styles.lsPart5)}></div>
      <div className={clsx(styles.lightsaber, styles.lsLeft, styles.lsGreen)}></div>
      <div className={clsx(styles.lightsaber, styles.lsRight, styles.lsRed)}></div>
    </div>
  );
};

export default Loader;
