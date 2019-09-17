import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

import noImage from "../img/noImage.jpg";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?";

const withResultsList = WrappedComponent =>
  class HOC extends Component {
    state = {
      currentPage: 1,
      currentPagePerson: 1,
      currentPageTV: 1,
      searchresults: [],
      personresults: [],
      tvresults: [],
      text: this.props.match.params.searchText,
      searchText: "",
      profileVisible: false,
      person: [],
      known_for: []
    };

    componentDidMount() {
      this.searchMovie();
      this.searchPerson();
      this.searchTvShows();
    }

    componentWillReceiveProps(prevProps) {
      if (prevProps.match.params.searchText !== this.props.location.searchText) {
        //take action here
        this.searchMovie();
        this.searchPerson();
        this.searchTvShows();
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

    searchTvShows = () => {
      const { text } = this.state;
      if (text) {
        axios
          .get(`${API_END_POINT}search/tv?api_key=${API_KEY}&query=${text}&page=1`)
          .then(resp => {
            if (resp.data.results) {
              this.setState({ tvresults: resp.data, currentPage: 1 });
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

    handleChangePageTV = page => {
      this.setState({ currentPageTV: page });
      const { text } = this.state;

      axios
        .get(`${API_END_POINT}search/tv?api_key=${API_KEY}&query=${text}&page=${page}`)
        .then(resp => {
          if (resp.data.results) {
            this.setState({ tvresults: resp.data });
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

    showDrawerProfile = () => {
      this.setState({
        profileVisible: true
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
        profileVisible: false
      });
    };

    getActorDetails = idPerson => {
      if (idPerson) {
        axios
          .get(`${API_END_POINT}person/${idPerson}?api_key=${API_KEY}`)
          .then(resp => this.setState({ person: resp.data }));
        this.addKnownForPerson(idPerson);
      }
    };

    addKnownForPerson = idPerson => {
      const { personresults } = this.state;
      const getPerson =
        personresults.results && personresults.results.filter(person => idPerson === person.id);
      this.setState(
        {
          known_for: getPerson[0].known_for
        },
        () => this.showDrawerProfile()
      );
    };

    render() {
      const { searchresults, personresults, text, tvresults, person, known_for } = this.state;

      const gridStyle = {
        width: "16%",
        textAlign: "center"
      };
      const { Paragraph } = Typography;
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
        tvresults.results &&
        tvresults.results.map(result => (
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
                {result.name}
              </Paragraph>
            </Link>
          </Card.Grid>
        ));

      const personsResults =
        personresults.results &&
        personresults.results.map(result => (
          <Card.Grid style={gridStyle} key={result.id}>
            <div>
              {result.profile_path ? (
                <a onClick={() => this.getActorDetails(result.id)}>
                  <img
                    alt='logo'
                    src={`https://image.tmdb.org/t/p/w185${result.profile_path}`}
                    height='278px'
                    width='185px'
                  />
                </a>
              ) : (
                <img src={noImage} alt='Pas de miniature pour ce film' />
              )}
            </div>
            <Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: "10px" }}>
              {result.name}
            </Paragraph>
          </Card.Grid>
        ));

      const {
        currentPage,
        currentPagePerson,
        currentPageTV,
        searchText,
        profileVisible
      } = this.state;

      return (
        <WrappedComponent
          currentPageTV={currentPageTV}
          currentPage={currentPage}
          currentPagePerson={currentPagePerson}
          personsResults={personsResults}
          tvResults={tvResults}
          moviesResults={moviesResults}
          tvresults={tvresults}
          personresults={personresults}
          searchresults={searchresults}
          text={text}
          handleChange={this.handleChange}
          handleChangePage={this.handleChangePage}
          handleChangePagePerson={this.handleChangePagePerson}
          handleChangePageTV={this.handleChangePageTV}
          renderRedirect={this.renderRedirect}
          searchText={searchText}
          profileVisible={profileVisible}
          onClose={this.onClose}
          person={person}
          known_for={known_for}
        />
      );
    }
  };

export default withResultsList;
