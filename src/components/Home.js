import React from "react";
import Header from "./Header";
import { Layout } from "antd";
import withApiMovie from "../HOC/withApiMovie";
import LatestMovies from "./LatestMovies";
import PopularMovies from "./PopularMovies";

const Home = ({ popularMovies, nowPlaying, handleClickCurrent, searchVideo }) => {
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
            <PopularMovies popularMovies={popularMovies} />
            <LatestMovies nowPlaying={nowPlaying} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
const WrappedComponent = withApiMovie(Home);
export default WrappedComponent;
