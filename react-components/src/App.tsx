import React from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import getData from './services/api/getData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount(): void {
    this.setState({ results: getData('') });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="section__top">
          <SearchInput />
        </div>
        <div className="section__bottom">Main page</div>
      </div>
    );
  }
}

export default App;
