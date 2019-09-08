import React from "react";
import { Typography, Row, Col, Rate } from "antd";
import VideoDetails from "./VideoDetails";
import "./videoList.css";
const { Title } = Typography;

const VideoList = ({ movies, currentMovie, youtubeKey, handleClickCurrent }) => {
  const computeStars = average => {
    return Math.round(average / 2, 1);
  };
  return (
    <Row gutter={16}>
      <Title level={3}>MOST POPULAR MOVIES</Title>
      <Col span={15}>
        <VideoDetails currentMovie={currentMovie} youtubeKey={youtubeKey} />
      </Col>
      <Col span={9}>
        {movies.map(item => (
          <Row
            className='hoverableRow'
            onClick={() => handleClickCurrent(item)}
            key={item.poster_path}>
            <Col span={4}>
              <img alt={item.title} src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} />
            </Col>
            <Col>
              <Title level={4}>{item.title}</Title>
              <Rate disabled allowHalf defaultValue={computeStars(item.vote_average)} />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export default VideoList;
