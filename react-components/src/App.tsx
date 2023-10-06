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
      homeworldData: null,
      isDataLoaded: false,
      isItemShow: false,
    };
  }

  componentDidMount = async () => {
    const value = localStorage.getItem('inputValue') || '';
    await this.getDataByValue(value);
  };

  getPageData = async (value) => {
    const apiData = await getDataByLink(value);
    this.setState({ data: apiData, isItemShow: false, isDataLoaded: true });
  };

  getItemData = async (value) => {
    const itemData = await getDataByLink(value);
    const homeworldData = await getDataByLink(itemData.homeworld);
    this.setState({ data: itemData, homeworldData, isItemShow: true, isDataLoaded: true });
  };

  getDataByValue = async (value) => {
    const apiData = await getDataByValue(value);
    this.setState({ data: apiData, isItemShow: false, isDataLoaded: true });
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    await this.getDataByValue(value);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="section__top">
          <SearchInput handleSubmit={this.handleSubmit} />
        </div>
        <div className="section__bottom">
          {this.state.isItemShow ? (
            <Item
              data={this.state.data}
              homeworldData={this.state.homeworldData}
              isDisabled={this.state.isDataLoaded}
              getDataByValue={this.getDataByValue}
            />
          ) : (
            <DisplayResults
              getPageData={this.getPageData}
              data={this.state.data}
              getItemData={this.getItemData}
              isDataLoaded={this.state.isDataLoaded}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
