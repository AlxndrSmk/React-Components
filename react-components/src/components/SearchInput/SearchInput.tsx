import { Component } from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      data: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const responce = await fetch('https://pokeapi.co/api/v2/ability/hp/');
      const data = await responce.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search pokemon
          <input type="text" name="name" value={this.state.inputValue} />
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchInput;
