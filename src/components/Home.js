import React from "react";
import VideoList from "./VideoList";
import Header from "./Header";
import { Layout } from "antd";
import withApiMovie from "../HOC/withApiMovie";

const Home = ({ movies, currentMovie, youtubeKey, handleClickCurrent, searchVideo }) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header searchVideo={searchVideo} />
      <Layout>
        <Layout>
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
              handleClickCurrent={handleClickCurrent}
              searchVideo={searchVideo}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
const WrappedComponent = withApiMovie(Home);
export default WrappedComponent;
