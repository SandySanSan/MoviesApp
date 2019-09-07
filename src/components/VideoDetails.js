import React from "react";
import { Typography, Row } from "antd";
const { Title } = Typography;

const VideoDetails = ({ currentMovie, youtubeKey }) => {
  const BASE_URL = "https://www.youtube.com/embed/";
  const currentMovieStyle = {
    padding: "10px"
  };

  return (
    <Row style={currentMovieStyle}>
      <iframe
        width='100%'
        height='600px'
        autoPlay={false}
        title='video'
        src={`${BASE_URL}${youtubeKey}`}></iframe>
      <Title level={3}>{currentMovie.title}</Title>
      <p>{currentMovie.overview}</p>
    </Row>
  );
};

export default VideoDetails;
