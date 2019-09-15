import React from "react";
import Header from "./Header";
import { Layout } from "antd";
import withApiMovie from "../HOC/withApiMovie";
import LatestMovies from "./LatestMovies";
import PopularMovies from "./PopularMovies";
import "./global.css";

const Home = ({ popularMovies, nowPlaying, searchVideo, loading }) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header searchVideo={searchVideo} />
      <Layout>
        <Content
          style={{
            padding: "20px 40px 0 40px",
            margin: 0,
            minHeight: 280
          }}>
          <PopularMovies popularMovies={popularMovies} loading={loading} />
          <LatestMovies nowPlaying={nowPlaying} />
        </Content>
      </Layout>
    </Layout>
  );
};
const WrappedComponent = withApiMovie(Home);
export default WrappedComponent;
