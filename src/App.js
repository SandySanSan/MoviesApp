import React, { Component } from "react";
import VideoList from "./components/VideoList";
import axios from "axios";
import Header from "./components/Header";
import { Layout, Breadcrumb } from "antd";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_PONT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=en&sort_by=popularity.desc&include_adult=false&api_key=";
const URL = `${API_END_PONT}${POPULAR_MOVIES_URL}${API_KEY}`;

class App extends Component {
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
    this.setState({ currentMovie: movie }, () => this.getVideo());
  };

  render() {
    const { Content } = Layout;
    const { movies, currentMovie, youtubeKey } = this.state;
    return (
      <Layout>
        <Header />
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}>
              <VideoList
                movies={movies}
                currentMovie={currentMovie}
                youtubeKey={youtubeKey}
                handleClickCurrent={this.handleClickCurrent}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
