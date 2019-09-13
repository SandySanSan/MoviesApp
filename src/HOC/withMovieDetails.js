import React, { Component } from "react";
import axios from "axios";

const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

const withMovieDetails = WrappedComponent =>
  class HOC extends Component {
    state = {
      currentMovie: [],
      recoMovies: [],
      youtubeKey: ""
    };

    componentDidMount() {
      this.getCurrentMovie();
      this.getVideo();
      this.setRecommendations();
    }

    getCurrentMovie() {
      const id = this.props.match.params.id;
      axios
        .get(`${API_END_POINT}movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ currentMovie: resp.data }));
    }

    getVideo() {
      const id = this.props.match.params.id;
      axios
        .get(`${API_END_POINT}movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
        .then(resp => this.setState({ youtubeKey: resp.data.videos.results[0].key }));
    }

    setRecommendations = () => {
      const id = this.props.match.params.id;
      axios.get(`${API_END_POINT}movie/${id}/recommendations?api_key=${API_KEY}`).then(resp =>
        this.setState(
          {
            recoMovies: resp.data.results.slice(0, 5)
          },
          () => this.getCredits()
        )
      );
    };

    getCredits() {
      const { currentMovie } = this.state;
      const id = this.props.match.params.id;
      if (id) {
        axios.get(`${API_END_POINT}movie/${id}/credits?api_key=${API_KEY}`).then(resp =>
          this.setState(
            {
              currentMovie: {
                ...currentMovie,
                credits: resp.data.cast
              }
            },
            () => this.getKeywords()
          )
        );
      }
    }

    getKeywords() {
      const { currentMovie } = this.state;
      const id = this.props.match.params.id;

      if (id) {
        axios.get(`${API_END_POINT}movie/${id}/keywords?api_key=${API_KEY}`).then(resp =>
          this.setState({
            currentMovie: {
              ...currentMovie,
              keywords: resp.data.keywords
            }
          })
        );
      }
    }

    handleClickCurrent = movie => {
      this.setState({ currentMovie: movie }, () => {
        this.getVideo();
        this.setRecommendations();
        this.getCredits();
      });
    };

    render() {
      const { currentMovie, recoMovies, youtubeKey } = this.state;
      return (
        <WrappedComponent
          currentMovie={currentMovie}
          handleClickCurrent={this.handleClickCurrent}
          recoMovies={recoMovies}
          youtubeKey={youtubeKey}
        />
      );
    }
  };
export default withMovieDetails;
