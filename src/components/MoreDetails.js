import React from "react";

import VideoDetails from "./VideoDetails";
import Header from "./Header";
import { Layout, Row, Col } from "antd";
import withMovieDetails from "../HOC/withMovieDetails";
import VideoList from "./VideoList";

const { Content } = Layout;

const MoreDetails = ({ currentMovie, handleClickCurrent, searchVideo, recoMovies, youtubeKey }) => {
  return (
    <Layout>
      <Header searchVideo={searchVideo} />
      <Layout>
        <Layout>
          <Content
            style={{
              background: "#fff",
              padding: 40,
              margin: 0
            }}>
            <Row gutter={16}>
              <Col span={16}>
                <VideoDetails
                  currentMovie={currentMovie}
                  searchVideo={searchVideo}
                  youtubeKey={youtubeKey}
                />
              </Col>
              <Col span={8}>
                <VideoList recoMovies={recoMovies} handleClickCurrent={handleClickCurrent} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const WrappedComponent = withMovieDetails(MoreDetails);
export default WrappedComponent;
