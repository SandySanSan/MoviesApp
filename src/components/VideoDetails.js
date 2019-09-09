import React from "react";
import { Typography, Row, Rate } from "antd";
const { Title } = Typography;

const VideoDetails = ({ currentMovie, youtubeKey }) => {
  const BASE_URL = "https://www.youtube.com/embed/";

  async function computeStars(average) {
    return Math.round(average / 5, 2);
  }

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
      <Title level={3}>
        {currentMovie.title} ({currentMovie.release_date})
      </Title>
      <Rate
        disabled
        allowHalf
        defaultValue={currentMovie.vote_average && computeStars(currentMovie.vote_average)}
      />
      <p>{currentMovie.overview}</p>
    </Row>
  );
};

export default VideoDetails;
