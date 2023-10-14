import React from 'react';
import withRouter from './routes/withRouter';
import getListData from './services/api/getListData';
import List from './components/List/List';

class App extends React.Component {
  private mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      listData: null,
      planetsListData: null,
      pathName: '',
      isDataLoaded: false,
      searchString: '',
    };
  }

  async setInitState() {
    await this.setState({
      currentPage: 1,
      listData: null,
      planetsListData: null,
      pathName: '',
      isDataLoaded: false,
      searchString: '',
    });
  }

  incrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage + 1 });
    this.getListData(this.state.searchString, this.state.currentPage, this.state.pathName);
  };

  decrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    this.getListData(this.state.searchString, this.state.currentPage, this.state.pathName);
  };

  componentDidMount = async () => {
    this.mounted = true;
    const currentPage = parseInt(this.props.location.search?.split('page=')[1]) || 1;
    const searchString = localStorage.getItem('inputValue') || '';
    const pathName = this.props.location.pathname.slice(1);
    await this.setState({ currentPage, searchString, pathName });
    this.getListData(this.state.searchString, currentPage, this.state.pathName);
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.location.search === '' && prevProps.location.search !== '') {
      this.setInitState();
      const pathName = this.props.location.pathname.slice(1);
      await this.setState({ pathName });
      this.getListData(this.state.searchString, this.state.currentPage, this.state.pathName);
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  getListData = async (searchString: string, page: number, pathName: string) => {
    const currentPage = page ? page : this.state.currentPage;
    await this.setState(() => ({ isDataLoaded: false }));
    const listData = await getListData(searchString, currentPage, pathName);
    if (this.mounted) {
      await this.setState(() => ({
        listData,
        isDataLoaded: true,
        currentPage,
      }));
      localStorage.setItem('inputValue', this.state.searchString);
      this.props.navigate(`?search=${this.state.searchString}&page=${currentPage}`);
    }
  };

  handleSubmit = async (searchString) => {
    localStorage.setItem('inputValue', searchString);
    await this.setState({ searchString, currentPage: 1 });
    this.getListData(searchString, this.state.currentPage, this.state.pathName);
  };

  render() {
    return (
      <List
        handleSubmit={this.handleSubmit}
        listData={this.state.listData}
        isDataLoaded={this.state.isDataLoaded}
        incrementPage={this.incrementPage}
        decrementPage={this.decrementPage}
        pathName={this.state.pathName}
      />
    );
  }
}

export default withRouter(App);
