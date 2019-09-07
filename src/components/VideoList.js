import React from "react";
import { Card, Typography } from "antd";
import VideoDetails from "./VideoDetails";

const VideoList = ({ movies, currentMovie, youtubeKey }) => {
  const { Title } = Typography;
  const gridStyle = {
    width: "20%",
    textAlign: "center"
  };
  return (
    <Card title={<Title level={3}>FILMS POPULAIRES</Title>}>
      <VideoDetails currentMovie={currentMovie} youtubeKey={youtubeKey} />
      {movies.map(item => (
        <Card.Grid style={gridStyle} key={item.id}>
          <Card
            type='inner'
            cover={
              <img alt='example' src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
            }></Card>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default VideoList;
