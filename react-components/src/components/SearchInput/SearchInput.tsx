import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    this.props.handleSubmit(this.state.inputValue);
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
        <input type="submit" value="Search" disabled={this.props.isDisabled} />
      </form>
    );
  }
}

export default SearchInput;
