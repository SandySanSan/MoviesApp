import React, { Component, Fragment } from "react";
import { Input, Button } from "antd";

class SearchBar extends Component {
  state = { searchText: "" };

  handleChange = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
  };

  render() {
    const { searchVideo } = this.props;
    const { searchText } = this.state;

    return (
      <Fragment>
        <Input
          placeholder='Search movies, people ...'
          onChange={this.handleChange}
          value={searchText}
          size='large'
        />
        <Button size='large' onClick={() => searchVideo(searchText)}>
          Search
        </Button>
      </Fragment>
    );
  }
}

export default SearchBar;
