import React from 'react';
import DisplayResults from './components/DisplayResults/DisplayResults';
import SearchInput from './components/SearchInput/SearchInput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    this.updateData = this.updateData.bind(this);
  }

  updateData(data) {
    this.setState({ data });
  }

  render() {
    console.log('Appdata', this.state.data);

    return (
      <div className="wrapper">
        <div className="section__top">
          <SearchInput updateData={this.updateData} />
        </div>
        <div className="section__bottom">
          <DisplayResults data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
