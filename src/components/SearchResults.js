import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import { Row, Col, Layout } from "antd";
import ResultsList from "./ResultsList";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?";

const { Content } = Layout;

class SearchResults extends Component {
  state = { searchresults: [] };

  componentDidMount() {
    this.searchVideo();
  }

  searchVideo = () => {
    const text = this.props.match.params.searchText;
    if (text) {
      axios.get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${text}`).then(resp => {
        if (resp.data.results) {
          this.setState({ searchresults: resp.data });
        }
      });
    }
  };

  render() {
    const { searchresults } = this.state;
    const text = this.props.match.params.searchText;

    return (
      <Fragment>
        <Layout>
          <Header searchVideo={this.searchVideo} />
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
                    <ResultsList searchresults={searchresults} text={text} />
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
