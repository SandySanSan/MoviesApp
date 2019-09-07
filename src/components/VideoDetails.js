import React from "react";
import { Typography, Card } from "antd";
import VideoPlayer from "./VideoPlayer";

const { Title } = Typography;
const VideoDetails = ({ currentMovie, youtubeKey }) => {
  return (
    <Card type='inner' title={<Title level={4}>A LA UNE : {currentMovie.title}</Title>}>
      <VideoPlayer youtubeKey={youtubeKey} />
    </Card>
  );
};

export default VideoDetails;
