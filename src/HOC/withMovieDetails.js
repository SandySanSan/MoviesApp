import React, { Component } from "react";
import axios from "axios";
import noImage from "../img/noImage-profile.jpg";
import { Button } from "antd";
const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

const withMovieDetails = WrappedComponent =>
  class HOC extends Component {
    state = {
      currentMovie: [],
      recoMovies: [],
      youtubeKey: "",
      visible: false,
      reviewsVisible: false,
      person: []
    };

    componentDidMount() {
      this.getCurrentMovie();
    }

    getCurrentMovie() {
      const id = this.props.match.params.id;
      axios
        .get(`${API_END_POINT}movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then(resp => this.setState({ currentMovie: resp.data }, () => this.getVideo()));
    }

    getVideo() {
      const { currentMovie } = this.state;
      if (currentMovie.id) {
        axios
          .get(
            `${API_END_POINT}movie/${currentMovie.id}?api_key=${API_KEY}&append_to_response=videos`
          )
          .then(
            resp =>
              resp.data.videos.results[0] &&
              this.setState({ youtubeKey: resp.data.videos.results[0].key }, () =>
                this.setRecommendations()
              )
          );
      }
    }

    setRecommendations = () => {
      const { currentMovie } = this.state;
      axios
        .get(`${API_END_POINT}movie/${currentMovie.id}/recommendations?api_key=${API_KEY}`)
        .then(resp =>
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
      if (currentMovie.id) {
        axios
          .get(`${API_END_POINT}movie/${currentMovie.id}/credits?api_key=${API_KEY}`)
          .then(resp =>
            this.setState(
              {
                currentMovie: {
                  ...currentMovie,
                  credits: resp.data
                }
              },
              () => this.getKeywords()
            )
          );
      }
    }

    getKeywords() {
      const { currentMovie } = this.state;

      if (currentMovie.id) {
        axios
          .get(`${API_END_POINT}movie/${currentMovie.id}/keywords?api_key=${API_KEY}`)
          .then(resp =>
            this.setState(
              {
                currentMovie: {
                  ...currentMovie,
                  keywords: resp.data.keywords
                }
              },
              () => this.getReviews()
            )
          );
      }
    }

    getReviews() {
      const { currentMovie } = this.state;
      if (currentMovie.id) {
        axios
          .get(`${API_END_POINT}movie/${currentMovie.id}/reviews?api_key=${API_KEY}`)
          .then(resp =>
            this.setState({
              currentMovie: {
                ...currentMovie,
                reviews: resp.data.results
              }
            })
          );
      }
    }

    getActorDetails = idPerson => {
      this.showDrawer();
      if (idPerson) {
        axios
          .get(`${API_END_POINT}person/${idPerson}?api_key=${API_KEY}`)
          .then(resp => this.setState({ person: resp.data }));
      }
    };

    handleClickCurrent = movie => {
      this.setState({ currentMovie: movie }, () => {
        this.setRecommendations();
        this.getVideo();
      });
    };

    showDrawer = () => {
      this.setState({
        visible: true
      });
    };

    showDrawerReviews = () => {
      this.setState({
        reviewsVisible: true
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
        reviewsVisible: false
      });
    };

    computeStars = average => Math.round(average / 2, 1);

    render() {
      const { currentMovie, recoMovies, youtubeKey, visible, person, reviewsVisible } = this.state;

      const data =
        currentMovie.credits &&
        currentMovie.credits.cast.map(actor => {
          const img = actor.profile_path ? (
            <img
              src={`http://image.tmdb.org/t/p/w45${actor.profile_path}`}
              alt={actor.profile_path}
              className='avatar-img-round'
            />
          ) : (
            <img src={noImage} alt='no profile provided' />
          );
          return {
            key: `${actor.id}`,
            name: `${actor.name}`,
            character: `${actor.character}`,
            photo: img,
            profile: (
              <Button onClick={() => this.getActorDetails(actor.id)} type='link' block>
                View profile
              </Button>
            )
          };
        });

      const dataCrew =
        currentMovie.credits &&
        currentMovie.credits.crew.map(crew => {
          const img = crew.profile_path ? (
            <img
              src={`http://image.tmdb.org/t/p/w45${crew.profile_path}`}
              alt={crew.profile_path}
              className='avatar-img-round'
            />
          ) : (
            <img src={noImage} alt='no profile provided' />
          );
          return {
            key: `${crew.id}`,
            name: `${crew.name}`,
            job: `${crew.job}`,
            photo: img,
            profile: (
              <Button onClick={() => this.getActorDetails(crew.id)} type='link' block>
                View profile
              </Button>
            )
          };
        });

      const columns = [
        {
          title: "Photo",
          dataIndex: "photo"
        },
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Character",
          dataIndex: "character"
        },
        {
          title: "",
          dataIndex: "profile"
        }
      ];

      const columnsCrew = [
        {
          title: "Photo",
          dataIndex: "photo"
        },
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Job",
          dataIndex: "job"
        },
        {
          title: "",
          dataIndex: "profile"
        }
      ];

      const directorName =
        currentMovie.credits && currentMovie.credits.crew.filter(crew => crew.job === "Director");

      return (
        <WrappedComponent
          currentMovie={currentMovie}
          handleClickCurrent={this.handleClickCurrent}
          recoMovies={recoMovies}
          youtubeKey={youtubeKey}
          data={data}
          computeStars={this.computeStars}
          directorName={directorName}
          columns={columns}
          visible={visible}
          reviewsVisible={reviewsVisible}
          onClose={this.onClose}
          showDrawer={this.showDrawer}
          showDrawerReviews={this.showDrawerReviews}
          person={person}
          dataCrew={dataCrew}
          columnsCrew={columnsCrew}
        />
      );
    }
  };
export default withMovieDetails;
