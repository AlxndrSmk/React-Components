import React from 'react';
import getDataByValue from './services/api/getDataByValue';
import getDataByLink from './services/api/getDataByLink';
import List from './components/List/List';
import SearchInput from './components/SearchInput/SearchInput';
import withRouter from './routes/withRouter';

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
    const queryParameters = new URLSearchParams(window.location.search);
    console.log(queryParameters);
    const type = queryParameters.get('search');
    console.log(type);

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
    this.setState(() => ({ isDataLoaded: false }));
    const apiData = await getDataByValue(value);
    console.log(apiData);
    const currentPage = parseInt(apiData.next?.match(/\d+/));
    this.setState(() => ({ data: apiData, isDataLoaded: true, currentPage }));
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    await this.getDataByValue(value);
  };

  render() {
    return (
      <>
        {/* <Item
              data={this.state.data}
              homeworldData={this.state.homeworldData}
              isDisabled={this.state.isDataLoaded}
              getDataByValue={this.getDataByValue}
              currentPage={this.state.currentPage}
            /> */}
        {this.state.isDataLoaded && <SearchInput handleSubmit={this.handleSubmit} />}
        <List
          getPageData={this.getPageData}
          data={this.state.data}
          getItemData={this.getItemData}
          isDataLoaded={this.state.isDataLoaded}
        />
      </>
    );
  }
}

export default withRouter(App);
