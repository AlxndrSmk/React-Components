import React from 'react';

class DisplayResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    console.log('Display this: ', this);
    console.log('Display props data: ', this.props.data);

    return <div>{JSON.stringify(this.state.data)}</div>;
  }
}

export default DisplayResults;
