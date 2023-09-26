class DisplayResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  render() {
    return <div>{this.props.data}</div>;
  }
}

export default DisplayResults;
