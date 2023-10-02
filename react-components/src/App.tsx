import React from 'react';
import DisplayResults from './components/DisplayResults/DisplayResults';
import SearchInput from './components/SearchInput/SearchInput';
import getDataByValue from './services/api/getDataByValue';
import getDataByLink from './services/api/getDataByLink';
import Pokemon from './components/Pokemon/Pokemon';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isDisabled: true,
      isPokemonShow: false,
      link: '',
    };
  }

  componentDidMount = async () => {
    const value = localStorage.getItem('inputValue') || '';
    await this.getDataByValue(value);
  };

  getDataByValue = async (value) => {
    value ? this.setState({ isPokemonShow: true }) : this.setState({ isPokemonShow: false });

    const apiData = await getDataByValue(value);
    this.setState({ data: apiData, isDisabled: false });
  };

  getDataByLink = async (value) => {
    const apiData = await getDataByLink(value);
    this.setState({ data: apiData, isDisabled: false });
  };

  updateData = (data) => {
    this.setState({ data });
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    this.setState({ isDisabled: true });
    await this.getDataByValue(value);
  };

  render() {
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
          {this.state.isPokemonShow ? (
            <Pokemon data={this.state.data} getDataByValue={this.getDataByValue} />
          ) : (
            <DisplayResults
              getDataByLink={this.getDataByLink}
              data={this.state.data}
              getDataByValue={this.getDataByValue}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
