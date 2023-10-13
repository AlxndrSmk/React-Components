import React from 'react';
import withRouter from './routes/withRouter';

import getDataByValue from './services/api/getDataByValue';
import getDataByLink from './services/api/getDataByLink';
import List from './components/List/List';
import SearchInput from './components/SearchInput/SearchInput';

class App extends React.Component {
  private mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      homeworldData: null,
      isDataLoaded: false,
      searchString: '',
      currentPage: 1,
    };
  }

  incrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage + 1 });
    this.getDataByValue();
  };

  decrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    this.getDataByValue();
  };

  componentDidMount = async () => {
    this.mounted = true;
    const value = localStorage.getItem('inputValue') || '';
    // TODO забрать page и забрать search
    const currentPage = parseInt(this.props.location.search?.split('page=')[1]) || 1;
    await this.setState({ currentPage, searchString: value });
    this.getDataByValue();
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.search === '' && prevProps.location.search !== '') {
      this.setInitState();
      this.getDataByValue();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    console.log('unmounted');
  }

  async setInitState() {
    await this.setState({
      data: null,
      homeworldData: null,
      isDataLoaded: false,
      searchString: '',
      currentPage: 1,
    });
  }

  getPageData = async (value) => {
    const apiData = await getDataByLink(value);
    this.setState({ data: apiData, isDataLoaded: true });
  };

  getItemData = async (value) => {
    const itemData = await getDataByLink(value);
    const homeworldData = await getDataByLink(itemData.homeworld);
    this.setState({ data: itemData, homeworldData, isDataLoaded: true });
  };

  getDataByValue = async (page?) => {
    console.log('getDataByValue');
    const currentPage = page ? page : this.state.currentPage;
    await this.setState(() => ({ isDataLoaded: false }));
    const apiData = await getDataByValue(this.state.searchString, currentPage);
    if (this.mounted) {
      await this.setState(() => ({ data: apiData, isDataLoaded: true, currentPage }));
      console.log('set');
      localStorage.setItem('inputValue', this.state.searchString);
      this.props.navigate(`?search=${this.state.searchString}&page=${currentPage}`);
    }
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    await this.setState({ searchString: value });
    this.getDataByValue(1);
  };

  render() {
    return (
      <>
        {/* <Person
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
          incrementPage={this.incrementPage}
          decrementPage={this.decrementPage}
        />
      </>
    );
  }
}

export default withRouter(App);
