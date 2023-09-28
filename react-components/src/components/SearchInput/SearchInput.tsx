import React from 'react';
import getData from '../../services/api/getData';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
      data: null,
      isDisabledButton: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.endpoint = this.state.inputValue.trim();
  }

  async componentDidMount() {
    await this.getData(this.endpoint);
  }

  async getData(endpoint) {
    const apiData = await getData(endpoint);
    this.setState({ data: apiData });
    this.props.updateData(apiData);
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    this.setState({ isDisabledButton: true });
    const apiData = await getData(this.endpoint);
    this.setState({ isDisabledButton: false, data: apiData });

    localStorage.setItem('inputValue', this.state.inputValue);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search pokemon
          <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Search" disabled={this.state.isDisabled} />
      </form>
    );
  }
}

export default SearchInput;
