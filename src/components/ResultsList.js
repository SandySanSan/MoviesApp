import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Card, Layout, Typography, BackTop, Tabs, Pagination, Input } from "antd";
import noImage from "../img/noImage.jpg";
import { withRouter } from "react-router-dom";
import HeaderSearchResults from "./HeaderSearchResults";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?";
const { Content } = Layout;
const { Search } = Input;

class ResultsList extends React.Component {
  state = {
    currentPage: 1,
    currentPagePerson: 1,
    searchresults: [],
    personresults: [],
    text: this.props.match.params.searchText,
    searchText: ""
  };

  componentDidMount() {
    this.searchMovie();
    this.searchPerson();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.match.params.searchText !== this.props.location.searchText) {
      //take action here
      this.searchMovie();
      this.searchPerson();
    }
  }

  searchMovie = () => {
    const { text } = this.state;
    if (text) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${text}&page=1`)
        .then(resp => {
          if (resp.data.results) {
            this.setState({ searchresults: resp.data, currentPage: 1 });
          }
        });
    }
  };

  searchPerson = () => {
    const { text } = this.state;
    if (text) {
      axios
        .get(`${API_END_POINT}search/person?api_key=${API_KEY}&query=${text}&page=1`)
        .then(resp => {
          if (resp.data.results) {
            this.setState({ personresults: resp.data, currentPage: 1 });
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

  handleChangePagePerson = page => {
    this.setState({ currentPagePerson: page });
    const { text } = this.state;

    axios
      .get(`${API_END_POINT}search/person?api_key=${API_KEY}&query=${text}&page=${page}`)
      .then(resp => {
        if (resp.data.results) {
          this.setState({ personresults: resp.data });
        }
      });
  };
  handleChange = e => {
    const text = e.target.value;
    this.setState({ text });
  };

  renderRedirect = () => {
    let { history } = this.props;

    this.state.text !== "" &&
      history.push({
        pathname: `/search-results/${this.state.text}`
      });
  };

  render() {
    const { searchresults, personresults, text } = this.state;

    const gridStyle = {
      width: "16%",
      textAlign: "center"
    };
    const { Paragraph } = Typography;
    const { TabPane } = Tabs;
    const resultsList = searchresults.results;

    const moviesResults =
      searchresults.results &&
      resultsList.map(result => (
        <Card.Grid style={gridStyle} key={`${result.id}${result.poster_path}`}>
          <Link to={`/movie-details/${result.id}`}>
            <div>
              {result.poster_path ? (
                <img
                  alt='logo'
                  src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                  height='278px'
                  width='185px'
                />
              ) : (
                <img src={noImage} alt='Pas de miniature pour ce film' />
              )}
            </div>
            <Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: "10px" }}>
              {result.title}
            </Paragraph>
          </Link>
        </Card.Grid>
      ));

    const tvResults =
      searchresults.results &&
      resultsList.map(result => (
        <Card.Grid style={gridStyle} key={result.id}>
          <Link to={`/movie-details/${result.id}`}>
            <div>
              {result.poster_path ? (
                <img
                  alt='logo'
                  src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                  height='278px'
                  width='185px'
                />
              ) : (
                <img src={noImage} alt='Pas de miniature pour ce film' />
              )}
            </div>
            <Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: "10px" }}>
              {result.title}
            </Paragraph>
          </Link>
        </Card.Grid>
      ));

    const personsResults =
      personresults.results &&
      personresults.results.map(result => (
        <Card.Grid style={gridStyle} key={result.id}>
          <Link to={`/movie-details/${result.id}`}>
            <div>
              {result.profile_path ? (
                <img
                  alt='logo'
                  src={`https://image.tmdb.org/t/p/w185${result.profile_path}`}
                  height='278px'
                  width='185px'
                />
              ) : (
                <img src={noImage} alt='Pas de miniature pour ce film' />
              )}
            </div>
            <Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: "10px" }}>
              {result.name}
            </Paragraph>
          </Link>
        </Card.Grid>
      ));

    const { currentPage, currentPagePerson } = this.state;

    return (
      <Fragment>
        <Layout>
          <HeaderSearchResults />
          <Content
            style={{
              padding: 40,
              margin: 0
            }}>
            <Row gutter={16}>
              <Col span={16}>
                <Row style={{ width: "90vw" }}>
                  <BackTop />
                  <Row>
                    <Col span={10}>
                      <div>
                        <Search
                          style={{ padding: "40px" }}
                          placeholder='Search movies, people ...'
                          onChange={this.handleChange}
                          value={text}
                          onSearch={() => this.renderRedirect()}
                          enterButton='Search'
                        />
                      </div>
                    </Col>
                  </Row>
                  <Col>
                    <Tabs tabPosition='left'>
                      <TabPane tab='MOVIES' key='1'>
                        <Pagination
                          defaultCurrent={1}
                          current={currentPage}
                          total={searchresults && searchresults.total_results}
                          pageSize={20}
                          onChange={event => this.handleChangePage(event)}
                        />
                        <Card
                          title={`${moviesResults && searchresults.total_results} movie(s) for "${
                            this.props.match.params.searchText
                          }"`}>
                          {moviesResults}
                        </Card>
                      </TabPane>
                      <TabPane tab='PEOPLE' key='2'>
                        <Pagination
                          defaultCurrent={1}
                          current={currentPagePerson}
                          total={personresults && personresults.total_results}
                          pageSize={20}
                          onChange={event => this.handleChangePagePerson(event)}
                        />
                        <Card
                          title={`${personsResults && personresults.total_results} person(s) for "${
                            this.props.match.params.searchText
                          }" `}>
                          {personsResults}
                        </Card>
                      </TabPane>
                      <TabPane tab='TV SHOWS' key='3' style={{ color: "white" }}>
                        <Pagination
                          defaultCurrent={1}
                          current={currentPage}
                          total={searchresults && searchresults.total_results}
                          pageSize={20}
                          onChange={event => this.handleChangePage(event)}
                        />
                        <Card title={`${tvResults && tvResults.length} TV Show(s) for "${text}"  `}>
                          {tvResults}
                        </Card>
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
              <Col span={8} />
            </Row>
          </Content>
        </Layout>
      </Fragment>
    );
  }
}

export default withRouter(ResultsList);
