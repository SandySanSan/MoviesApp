import React, { Component } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_PONT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=en&sort_by=popularity.desc&include_adult=false&api_key=";
const URL = `${API_END_PONT}${POPULAR_MOVIES_URL}${API_KEY}`;
const SEARCH_URL = "search/movie?";
const withApiMovie = WrappedComponent =>
  class HOC extends Component {
    state = { movies: [], currentMovie: [], youtubeKey: "" };

    componentDidMount() {
      this.initMovies();
    }

    initMovies() {
      axios.get(URL).then(resp =>
        this.setState(
          {
            movies: resp.data.results.slice(1, 6),
            currentMovie: resp.data.results[0]
          },
          () => this.getVideo()
        )
      );
    }

    getVideo() {
      const { currentMovie } = this.state;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${currentMovie.id}?api_key=${API_KEY}&append_to_response=videos`
        )
        .then(resp => this.setState({ youtubeKey: resp.data.videos.results[0].key }));
    }

    handleClickCurrent = movie => {
      this.setState({ currentMovie: movie }, () => {
        this.getVideo();
        this.setRecommendations();
      });
    };

    searchVideo = searchText => {
      if (searchText) {
        axios
          .get(`${API_END_PONT}${SEARCH_URL}api_key=${API_KEY}&query=${searchText}`)
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
        .get(`${API_END_PONT}movie/${currentMovie.id}/recommendations?api_key=${API_KEY}`)
        .then(resp =>
          this.setState({
            movies: resp.data.results.slice(0, 5)
          })
        );
    };

    render() {
      const { movies, currentMovie, youtubeKey } = this.state;

      return (
        <WrappedComponent
          movies={movies}
          currentMovie={currentMovie}
          youtubeKey={youtubeKey}
          handleClickCurrent={this.handleClickCurrent}
          searchVideo={this.searchVideo}
          {...this.props}
        />
      );
    }
  };
export default withApiMovie;
