import React, { Component } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=en&sort_by=popularity.desc&include_adult=false&api_key=";
const URL = `${API_END_POINT}${POPULAR_MOVIES_URL}${API_KEY}`;

const withApiMovie = WrappedComponent =>
  class HOC extends Component {
    state = { popularMovies: [], nowPlaying: [], loading: true, trending: [], trendingPersons: [] };

    componentDidMount() {
      this.initPopularMovies();
      this.initNowPlayingMovies();
      this.initTrendings();
      this.initTrendingsPersons();
    }

    initPopularMovies = () => {
      axios.get(URL).then(
        resp =>
          resp.data &&
          this.setState({
            popularMovies: resp.data.results.slice(0, 5),
            currentMovie: resp.data.results[0],
            loading: false
          })
      );
    };

    initNowPlayingMovies() {
      axios
        .get(`${API_END_POINT}movie/now_playing?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ nowPlaying: resp.data.results.slice(0, 6) }));
    }

    initTrendings() {
      axios
        .get(`${API_END_POINT}trending/movie/day?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ trending: resp.data.results.slice(0, 5) }));
    }

    initTrendingsPersons() {
      axios
        .get(`${API_END_POINT}trending/person/day?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ trendingPersons: resp.data.results.slice(0, 5) }));
    }

    render() {
      const { popularMovies, nowPlaying, loading, trending, trendingPersons } = this.state;

      return (
        <WrappedComponent
          popularMovies={popularMovies}
          nowPlaying={nowPlaying}
          loading={loading}
          trending={trending}
          trendingPersons={trendingPersons}
        />
      );
    }
  };
export default withApiMovie;
