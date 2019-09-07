import React from "react";
const BASE_URL = "https://www.youtube.com/embed/";

const VideoPlayer = ({ youtubeKey }) => {
  return (
    <div>
      <iframe
        width='100%'
        height='600px'
        autoplay='false'
        title='video'
        src={`${BASE_URL}${youtubeKey}`}></iframe>
    </div>
  );
};

export default VideoPlayer;
