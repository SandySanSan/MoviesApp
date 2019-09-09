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
    state = { movies: [], currentMovie: [], youtubeKey: "", latestMovies: [] };

    componentDidMount() {
      this.initMovies();
      this.initLastestMovies();
    }

    initMovies = () => {
      axios.get(URL).then(
        resp =>
          resp.data &&
          this.setState(
            {
              movies: resp.data.results.slice(1, 6),
              currentMovie: resp.data.results[0]
            },
            () => {
              this.getVideo();
              this.getCredits();
            }
          )
      );
    };

    initLastestMovies() {
      axios
        .get(`${API_END_POINT}movie/now_playing?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ latestMovies: resp.data.results.slice(0, 6) }));
    }

    getVideo() {
      const { currentMovie } = this.state;
      axios
        .get(
          `${API_END_POINT}movie/${currentMovie.id}?api_key=${API_KEY}&append_to_response=videos`
        )
        .then(resp => this.setState({ youtubeKey: resp.data.videos.results[0].key }));
    }

    handleClickCurrent = movie => {
      this.setState({ currentMovie: movie }, () => {
        this.getVideo();
        this.setRecommendations();
        this.getCredits();
      });
    };

    searchVideo = searchText => {
      if (searchText) {
        axios
          .get(`${API_END_POINT}${SEARCH_URL}api_key=${API_KEY}&query=${searchText}`)
          .then(resp => {
            if (resp.data && resp.data.results[0]) {
              this.setState({ currentMovie: resp.data.results[0] }, () => {
                this.getVideo();
                this.setRecommendations();
              });
            }
          });
      }
    };

    setRecommendations = () => {
      const { currentMovie } = this.state;
      axios
        .get(`${API_END_POINT}movie/${currentMovie.id}/recommendations?api_key=${API_KEY}`)
        .then(resp =>
          this.setState({
            movies: resp.data.results.slice(0, 5)
          })
        );
    };

    async getCredits() {
      const { currentMovie } = this.state;
      if (currentMovie.id) {
        axios
          .get(`https://api.themoviedb.org/3/movie/${currentMovie.id}/credits?api_key=${API_KEY}`)
          .then(resp =>
            this.setState({
              currentMovie: {
                ...currentMovie,
                credits: resp.data.cast
              }
            })
          );
      }
    }

    render() {
      const { movies, currentMovie, youtubeKey, latestMovies } = this.state;

      return (
        <WrappedComponent
          movies={movies}
          currentMovie={currentMovie}
          youtubeKey={youtubeKey}
          handleClickCurrent={this.handleClickCurrent}
          searchVideo={this.searchVideo}
          latestMovies={latestMovies}
          getCredits={this.getCredits}
          {...this.props}
        />
      );
    }
  };
export default withApiMovie;
