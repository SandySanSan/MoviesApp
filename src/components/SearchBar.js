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
    const { searchVideo } = this.props;
    const { searchText } = this.state;

    return (
      <Search
        placeholder='Search movies, people ...'
        onChange={this.handleChange}
        value={searchText}
        onSearch={() => searchVideo(searchText)}
        enterButton
      />
    );
  }
}

export default SearchBar;
