import React from 'react';
import styles from './ErrorButton.module.scss';
import { TErrorButtonProps, IErrorButtonState } from '../../types/types';

class ErrorButton extends React.Component<TErrorButtonProps, IErrorButtonState> {
  constructor(props: TErrorButtonProps) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  handleClick() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      throw Error('You generated an error and ErrorBoundary successfully caught it!');
    }
    return (
      <div
        className={styles.error_button}
        onClick={() => {
          this.handleClick();
        }}
      >
        Err0r butt0n
      </div>
    );
  }
}

export default ErrorButton;
