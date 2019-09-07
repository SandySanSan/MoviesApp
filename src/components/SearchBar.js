import React, { Component } from "react";
import { Input } from "antd";

class SearchBar extends Component {
  state = { searchText: "" };

  handleChange = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
  };

  render() {
    const { Search } = Input;

    const { searchText } = this.state;
    return <Search placeholder='Recherche' onChange={this.handleChange} value={searchText} />;
  }
}

export default SearchBar;
