import React from "react";

import VideoDetails from "./VideoDetails";
import Header from "./Header";
import { Layout, Row, Col } from "antd";
import withMovieDetails from "../HOC/withMovieDetails";
import VideoList from "./VideoList";

const { Content } = Layout;

const MoreDetails = ({
  currentMovie,
  handleClickCurrent,
  searchVideo,
  recoMovies,
  youtubeKey,
  data,
  computeStars,
  columns,
  directorName,
  visible,
  onClose,
  showDrawer,
  person
}) => {
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
            <Row gutter={25}>
              <Col span={15}>
                <VideoDetails
                  currentMovie={currentMovie}
                  searchVideo={searchVideo}
                  youtubeKey={youtubeKey}
                  data={data}
                  computeStars={computeStars}
                  directorName={directorName}
                  columns={columns}
                  visible={visible}
                  onClose={onClose}
                  showDrawer={showDrawer}
                  person={person}
                />
              </Col>
              <Col span={8} offset={1}>
                <VideoList
                  computeStars={computeStars}
                  recoMovies={recoMovies}
                  handleClickCurrent={handleClickCurrent}
                />
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
