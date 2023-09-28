import React from 'react';
import DisplayResults from './components/DisplayResults/DisplayResults';
import SearchInput from './components/SearchInput/SearchInput';
import getData from './services/api/getData';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isDisabled: true,
    };

    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    const value = localStorage.getItem('inputValue') || '';
    await this.getData(value);
  }

  async getData(value) {
    const apiData = await getData(value);
    this.setState({ data: apiData, isDisabled: false });
    console.log(this.state.data);
  }

  updateData(data) {
    this.setState({ data });
  }

  handleSubmit = async (event) => {
    console.log(event);
    this.setState({ ...this.state, isDisabled: true });
    await this.getData(event);
  };

  render() {
    // console.log('Appdata', this.state.data);

    return (
      <div className="wrapper">
        <div className="section__top">
          <SearchInput
            updateData={this.updateData}
            handleSubmit={this.handleSubmit}
            isDisabled={this.state.isDisabled}
          />
        </div>
        <div className="section__bottom">
          <DisplayResults data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
