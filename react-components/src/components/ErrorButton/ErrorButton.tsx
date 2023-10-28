import React from 'react';

class ErrorButton extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          throw new Error('This is an error!');
        }}
      >
        Error button
      </div>
    );
  }
}

export default ErrorButton;
