import React, { Component, Fragment } from "react";
import { Input } from "antd";
import { withRouter } from "react-router-dom";

const { Search } = Input;

class SearchBar extends Component {
  state = { searchText: "" };

  handleChange = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
  };

  renderRedirect = () => {
    let { history } = this.props;

    this.state.searchText !== "" &&
      history.push({
        pathname: `/search-results/${this.state.searchText}`
      });
  };

  render() {
    const { searchText } = this.state;

    return (
      <Fragment>
        <Search
          placeholder='Search movies, people ...'
          onChange={this.handleChange}
          value={searchText}
          onSearch={this.renderRedirect}
        />
        {/* <Button onClick={this.setRedirect}>Search</Button> */}
      </Fragment>
    );
  }
}

export default withRouter(SearchBar);
