import React from "react";
import Header from "./Header";
import { Layout } from "antd";
import withApiMovie from "../HOC/withApiMovie";
import LatestMovies from "./LatestMovies";
import PopularMovies from "./PopularMovies";
import Trendings from "./Trendings";
import "./global.css";
import FooterCredits from "./Footer";

const Home = ({ popularMovies, nowPlaying, loading, trending, trendingPersons }) => {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <Header />
      <Layout>
        <Content
          style={{
            padding: "20px 40px 20px 40px",
            margin: 0,
            minHeight: 280
          }}>
          <PopularMovies popularMovies={popularMovies} loading={loading} />
          <LatestMovies nowPlaying={nowPlaying} />
          <Trendings trending={trending} trendingPersons={trendingPersons} />
        </Content>
      </Layout>
      <Footer>
        <FooterCredits />
      </Footer>
    </Layout>
  );
};
const WrappedComponent = withApiMovie(Home);
export default WrappedComponent;
