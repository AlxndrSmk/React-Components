import { Component } from 'react';
import getData from '../../services/api/getData';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      data: null,
      isDisabled: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const endpoint = this.state.inputValue.trim();

    this.setState({ isDisabled: true });
    await getData(endpoint);
    this.setState({ isDisabled: false });
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search pokemon
          <input
            type="text"
            name="name"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Search" disabled={this.state.isDisabled} />
      </form>
    );
  }
}

export default SearchInput;
