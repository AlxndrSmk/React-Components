import React from 'react';
import SearchInput from '../SearchInput/SearchInput';

class Header extends React.Component {
  render() {
    return (
      <div className="section__top">
        <img className="logo" src="/images/icons/sw_logo.png" />
        <SearchInput handleSubmit={this.props.handleSubmit} />
      </div>
    );
  }
}

export default Header;
