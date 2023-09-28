import React from 'react';

class DisplayResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log('prevProps', prevProps.data);
    // console.log('Props', this.props.data);
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    // console.log('propsdata', this.props.data);

    return <div>{JSON.stringify(this.props.data)}</div>;
  }
}

export default DisplayResults;
