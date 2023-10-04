import React from 'react';
import DisplayResults from './components/DisplayResults/DisplayResults';
import SearchInput from './components/SearchInput/SearchInput';
import getDataByValue from './services/api/getDataByValue';
import Item from './components/Item/Item';
import getDataByLink from './services/api/getDataByLink';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isDisabled: true,
      isItemShow: false,
      link: '',
    };
  }

  componentDidMount = async () => {
    const value = localStorage.getItem('inputValue') || '';
    await this.getDataByValue(value);
  };

  getDataByValue = async (value) => {
    localStorage.clear();
    const apiData = await getDataByValue(value);
    this.setState({ data: apiData, isDisabled: false });
  };

  getDataByLink = async (value) => {
    const apiData = await getDataByLink(value);
    this.setState({ data: apiData, isDisabled: false, isItemShow: false });
  };

  updateData = (data) => {
    this.setState({ data });
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
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
          {this.state.isItemShow ? (
            <Item getDataByValue={this.getDataByValue} data={this.state.data} />
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
