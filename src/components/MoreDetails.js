import React from "react";

import VideoDetails from "./VideoDetails";
import Header from "./Header";
import { Layout, Row, Col } from "antd";
import withMovieDetails from "../HOC/withMovieDetails";
import VideoList from "./VideoList";
import TvShowDetails from "./TvShowDetails";
import Footer from "./Footer";
import "./videoList.css";

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
  type,
  loading,
  toggleLoading
}) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Layout>
          <Content
            style={{
              background: "#fff",
              margin: 0
            }}>
            <Row gutter={0}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={16}
                xl={16}
                className='shadow-pane'
                style={{ padding: "60px" }}>
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
                    loading={loading}
                    toggleLoading={toggleLoading}
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
              <Col xs={18} sm={18} md={18} lg={8} xl={8} style={{ padding: "40px 0 40px 40px" }}>
                <VideoList
                  computeStars={computeStars}
                  recoMovies={recoMovies}
                  type={type}
                  handleClickCurrent={handleClickCurrent}
                />
              </Col>
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

const WrappedComponent = withMovieDetails(MoreDetails);
export default WrappedComponent;
