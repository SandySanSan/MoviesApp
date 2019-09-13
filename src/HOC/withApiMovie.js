import React, { Component } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=en&sort_by=popularity.desc&include_adult=false&api_key=";
const URL = `${API_END_POINT}${POPULAR_MOVIES_URL}${API_KEY}`;
const SEARCH_URL = "search/movie?";

const withApiMovie = WrappedComponent =>
  class HOC extends Component {
    state = { popularMovies: [], nowPlaying: [] };

    componentDidMount() {
      this.initPopularMovies();
      this.InitNowPlayingMovies();
    }

    initPopularMovies = () => {
      axios.get(URL).then(
        resp =>
          resp.data &&
          this.setState({
            popularMovies: resp.data.results.slice(1, 6),
            currentMovie: resp.data.results[0]
          })
      );
    };

    InitNowPlayingMovies() {
      axios
        .get(`${API_END_POINT}movie/now_playing?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ nowPlaying: resp.data.results.slice(0, 6) }));
    }

    searchVideo = searchText => {
      if (searchText) {
        axios
          .get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${searchText}`)
          .then(resp => {
            if (resp.data && resp.data.results[0]) {
              this.setState({ currentMovie: resp.data.results[0] });
            }
          });
      }
    };

    render() {
      const { popularMovies, nowPlaying } = this.state;

      return (
        <WrappedComponent
          popularMovies={popularMovies}
          searchVideo={this.searchVideo}
          nowPlaying={nowPlaying}
        />
      );
    }
  };
export default withApiMovie;
