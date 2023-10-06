import React from 'react';
import Main from './components/Main/Main';
import getDataByValue from './services/api/getDataByValue';
// import Item from './components/Item/Item';
import getDataByLink from './services/api/getDataByLink';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      homeworldData: null,
      isDataLoaded: false,
      currentPage: 1,
    };
  }

  componentDidMount = async () => {
    const value = localStorage.getItem('inputValue') || '';
    await this.getDataByValue(value);
  };

  getPageData = async (value) => {
    const apiData = await getDataByLink(value);
    this.setState({ data: apiData, isDataLoaded: true });
  };

  getItemData = async (value) => {
    const itemData = await getDataByLink(value);
    const homeworldData = await getDataByLink(itemData.homeworld);
    this.setState({ data: itemData, homeworldData, isDataLoaded: true });
  };

  getDataByValue = async (value) => {
    const apiData = await getDataByValue(value);
    console.log(apiData);
    const currentPage = parseInt(apiData.next?.match(/\d+/));
    this.setState({ data: apiData, isDataLoaded: true, currentPage });
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    await this.getDataByValue(value);
  };

  render() {
    return (
      <div className="section__bottom">
        {/* <Item
              data={this.state.data}
              homeworldData={this.state.homeworldData}
              isDisabled={this.state.isDataLoaded}
              getDataByValue={this.getDataByValue}
              currentPage={this.state.currentPage}
            /> */}

        <Main
          getPageData={this.getPageData}
          data={this.state.data}
          getItemData={this.getItemData}
          isDataLoaded={this.state.isDataLoaded}
        />
      </div>
    );
  }
}

export default App;
