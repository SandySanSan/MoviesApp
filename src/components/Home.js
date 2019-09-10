import React from "react";
import VideoList from "./VideoList";
import Header from "./Header";
import { Layout } from "antd";
import withApiMovie from "../HOC/withApiMovie";
import LatestMovies from "./LatestMovies";

const Home = ({
  movies,
  currentMovie,
  youtubeKey,
  nowPlaying,
  handleClickCurrent,
  searchVideo,
  getCredits
}) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header searchVideo={searchVideo} />
      <Layout>
        <Layout>
          <Content
            style={{
              background: "#fff",
              padding: 40,
              margin: 0,
              minHeight: 280
            }}>
            <VideoList
              movies={movies}
              currentMovie={currentMovie}
              youtubeKey={youtubeKey}
              handleClickCurrent={handleClickCurrent}
              searchVideo={searchVideo}
              getCredits={getCredits}
            />
            <LatestMovies nowPlaying={nowPlaying} handleClickCurrent={handleClickCurrent} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
const WrappedComponent = withApiMovie(Home);
export default WrappedComponent;
