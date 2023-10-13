import React from 'react';
import withRouter from './routes/withRouter';
import getPeopleListData from './services/api/getPeopleListData';
import List from './components/List/List';

class App extends React.Component {
  private mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      data: null,
      isDataLoaded: false,
      planetData: null,
      searchString: '',
      dataSource: 'people',
    };
  }

  async setInitState() {
    await this.setState({
      data: null,
      planetData: null,
      isDataLoaded: false,
      searchString: '',
      currentPage: 1,
      dataSource: 'people',
    });
  }

  incrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage + 1 });
    this.getListData();
  };

  decrementPage = async () => {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    this.getListData();
  };

  componentDidMount = async () => {
    this.mounted = true;
    const value = localStorage.getItem('inputValue') || '';
    // TODO забрать page и забрать search
    const currentPage = parseInt(this.props.location.search?.split('page=')[1]) || 1;
    await this.setState({ currentPage, searchString: value });
    this.getListData();
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.search === '' && prevProps.location.search !== '') {
      this.setInitState();
      this.getListData();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    console.log('unmounted');
  }

  getListData = async (page: number) => {
    const currentPage = page ? page : this.state.currentPage;
    await this.setState(() => ({ isDataLoaded: false }));
    const appData = await getPeopleListData(this.state.searchString, currentPage);
    if (this.mounted) {
      await this.setState(() => ({ data: appData, isDataLoaded: true, currentPage }));
      localStorage.setItem('inputValue', this.state.searchString);
      this.props.navigate(`?search=${this.state.searchString}&page=${currentPage}`);
    }
    console.log('getListData', appData);
  };

  handleSubmit = async (value) => {
    localStorage.setItem('inputValue', value);
    await this.setState({ searchString: value });
    this.getListData(1);
  };

  render() {
    return (
      <List
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        isDataLoaded={this.state.isDataLoaded}
        incrementPage={this.incrementPage}
        decrementPage={this.decrementPage}
      />
    );
  }
}

export default withRouter(App);
