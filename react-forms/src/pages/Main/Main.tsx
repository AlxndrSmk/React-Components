import { Link } from 'react-router-dom';

import styles from './Main.module.scss';
import { useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';

const Main: React.FC = () => {
  const userForms = useAppSelector((store) => store.userForms);
  const [newId, setNewId] = useState<number | null>(null);

  useEffect(() => {
    if (userForms.length > 0) {
      setNewId(0);
      const timeoutId = setTimeout(() => {
        setNewId(null);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [userForms]);

  return (
    <>
      <div className={styles.buttons__wrapper}>
        <Link to="react-hook-form">
          <button className={styles.buttons__link}>React Hook form</button>
        </Link>
        <Link to="uncontrolled-form">
          <button className={styles.buttons__link}>Uncontrolled form</button>
        </Link>
      </div>
      <div className={styles.forms__wrapper}>
        {userForms.length ? (
          userForms.map((field, i) => (
            <div
              className={`${styles.user__wrapper} ${newId === i ? styles.selected : ''}`}
              key={i}
            >
              <div className={styles.image}>
                <img src={field.image} alt="profile image" />
              </div>
              <div className={styles.description}>
                <p>Name: {field.name}</p>
                <p>Age: {field.age}</p>
                <p>Email: {field.email}</p>
                <p>Password: {field.password}</p>
                <p>Gender: {field.sex}</p>
                <p>Country: {field.country}</p>
              </div>
            </div>
          ))
        ) : (
          <>
            <h2>No data available.</h2>
            <h3>Please select the form and enter your information.</h3>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
