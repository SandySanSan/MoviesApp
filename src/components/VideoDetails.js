import React from "react";
import { Typography, Row, Rate } from "antd";
const { Title } = Typography;

const VideoDetails = ({ currentMovie, youtubeKey, credits, getCredits }) => {
  const BASE_URL = "https://www.youtube.com/embed/";

  function computeStars(average) {
    return Math.round(average / 5);
  }

  const currentMovieStyle = {
    padding: "10px"
  };

  const actorsList =
    currentMovie.credits &&
    currentMovie.credits.map(actor => (
      <div>
        {actor.name} ({actor.character})
      </div>
    ));

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
      <p>{actorsList}</p>
    </Row>
  );
};

export default VideoDetails;
