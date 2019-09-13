import React from "react";

import VideoDetails from "./VideoDetails";
import Header from "./Header";
import { Layout, Typography, Row, Col, Rate } from "antd";
import withMovieDetails from "../HOC/withMovieDetails";

const { Content } = Layout;
const { Title } = Typography;

const MoreDetails = ({ currentMovie, handleClickCurrent, searchVideo, recoMovies, youtubeKey }) => {
  const computeStars = average => Math.round(average / 2, 1);

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
            <Row gutter={16}>
              <Col span={16}>
                <VideoDetails
                  currentMovie={currentMovie}
                  youtubeKey={youtubeKey}
                  searchVideo={searchVideo}
                />
              </Col>
              <Col span={8}>
                {recoMovies.map(item => (
                  <Row
                    className='hoverableRow'
                    onClick={() => handleClickCurrent(item)}
                    key={item.poster_path}>
                    <Col span={5}>
                      <img
                        alt={item.title}
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      />
                    </Col>
                    <Col>
                      <Title level={4}>
                        {item.title} ({item.release_date.slice(0, 4)})
                      </Title>
                      <Rate disabled allowHalf defaultValue={computeStars(item.vote_average)} />
                    </Col>
                  </Row>
                ))}
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
