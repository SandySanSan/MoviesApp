import React, { Fragment } from "react";
import { Typography, Row, Col, Rate } from "antd";
import "./videoList.css";
const { Title } = Typography;

const VideoList = ({ recoMovies, handleClickCurrent }) => {
  const computeStars = average => Math.round(average / 2, 1);
  return (
    <Fragment>
      {recoMovies.map(item => (
        <Row
          className='hoverableRow'
          onClick={() => handleClickCurrent(item)}
          key={item.poster_path}>
          <Col span={5}>
            <img alt={item.title} src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} />
          </Col>
          <Col>
            <Title level={4}>
              {item.title} ({item.release_date.slice(0, 4)})
            </Title>
            <Rate disabled allowHalf defaultValue={computeStars(item.vote_average)} />
          </Col>
        </Row>
      ))}
    </Fragment>
  );
};

export default VideoList;
