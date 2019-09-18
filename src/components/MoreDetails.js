import React from "react";

import VideoDetails from "./VideoDetails";
import Header from "./Header";
import { Layout, Row, Col } from "antd";
import withMovieDetails from "../HOC/withMovieDetails";
import VideoList from "./VideoList";
import TvShowDetails from "./TvShowDetails";

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
  reviewsVisible,
  onClose,
  showDrawer,
  showDrawerReviews,
  person,
  dataCrew,
  columnsCrew,
  type
}) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Layout>
          <Content
            style={{
              background: "#fff",
              margin: 0,
              paddingRight: 40
            }}>
            <Row gutter={0}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={15}
                xl={15}
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #021529, #3e4557, #7a7d8a, #babac1, #fbfbfb)",
                  padding: 60,
                  boxShadow: "0px 10px 16px #021529"
                }}>
                {type === "movie" ? (
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
                    dataCrew={dataCrew}
                    columnsCrew={columnsCrew}
                    showDrawerReviews={showDrawerReviews}
                    reviewsVisible={reviewsVisible}
                  />
                ) : (
                  <TvShowDetails
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
                    dataCrew={dataCrew}
                    columnsCrew={columnsCrew}
                    showDrawerReviews={showDrawerReviews}
                    reviewsVisible={reviewsVisible}
                  />
                )}
              </Col>
              <Col xs={18} sm={18} md={18} lg={8} xl={8} offset={1} style={{ paddingTop: 40 }}>
                <VideoList
                  computeStars={computeStars}
                  recoMovies={recoMovies}
                  type={type}
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
