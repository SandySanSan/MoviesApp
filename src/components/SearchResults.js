import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import { Row, Col, Layout, Pagination } from "antd";
import ResultsList from "./ResultsList";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?";

const { Content } = Layout;

class SearchResults extends Component {
  state = { searchresults: [], currentPage: "", text: this.props.match.params.searchText };

  componentDidMount() {
    this.searchMovie();
  }

  searchMovie = () => {
    const { text } = this.state;
    if (text) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${text}&page=1`)
        .then(resp => {
          if (resp.data.results) {
            this.setState({ searchresults: resp.data });
          }
        });
    }
  };

  handleChangePage = page => {
    this.setState({ currentPage: page });
    const { text } = this.state;

    axios
      .get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${text}&page=${page}`)
      .then(resp => {
        if (resp.data.results) {
          this.setState({ searchresults: resp.data });
        }
      });
  };

  render() {
    const { searchresults, currentPage } = this.state;
    const { text } = this.state;

    return (
      <Fragment>
        <Layout>
          <Header searchVideo={this.searchMovie} />
          <Layout>
            <Layout>
              <Content
                style={{
                  background: "#fff",
                  padding: 40,
                  margin: 0
                }}>
                <Row gutter={16}>
                  <Col span={16}>
                    <Pagination
                      defaultCurrent={1}
                      current={currentPage}
                      total={searchresults.total_results}
                      pageSize={20}
                      onChange={event => this.handleChangePage(event)}
                    />
                    <ResultsList searchresults={searchresults} text={text} />
                    <Pagination
                      defaultCurrent={1}
                      current={currentPage}
                      total={searchresults.total_results}
                      pageSize={20}
                      onChange={event => this.handleChangePage(event)}
                    />
                  </Col>
                  <Col span={8} />
                </Row>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default SearchResults;
