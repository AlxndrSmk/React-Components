import { useState } from 'react';
import styles from './ErrorButton.module.scss';
import { TErrorButtonProps } from '../../types/types';

const ErrorButton: React.FC<TErrorButtonProps> = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw Error('You generated an error and ErrorBoundary successfully caught it!');
  }

  return (
    <div
      className={styles.error_button}
      onClick={() => {
        handleClick();
      }}
    >
      Err0r butt0n
    </div>
  );
};

export default ErrorButton;
