import React, { Fragment } from "react";
import { Typography, Row, Col, Rate } from "antd";
import noImage from "../img/noImage.jpg";
import "./videoList.css";
const { Title } = Typography;

const VideoList = ({ recoMovies, handleClickCurrent, computeStars, type }) => {
  return (
    <Fragment>
      <Row style={{ backgroundColor: "rgba(122, 122, 122, 0.1)", padding: "10px" }}>SIMILAR</Row>
      {recoMovies.map(item => (
        <div key={item.id}>
          <Row className='hoverableRow' onClick={() => handleClickCurrent(item, type)}>
            <Col span={5} style={{ marginRight: "15px" }}>
              {item.poster_path ? (
                <img
                  alt={item.title}
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  objectFit='cover'
                />
              ) : (
                <img src={noImage} height='138' width='92' alt='no poster provided' />
              )}
            </Col>
            <Col span={18}>
              <Title level={4}>
                {type === "movie" ? item.title : item.name} (
                {type === "movie" ? item.release_date.slice(0, 4) : item.first_air_date.slice(0, 4)}
                )
              </Title>
              <Rate disabled allowHalf defaultValue={computeStars(item.vote_average)} />
            </Col>
          </Row>
        </div>
      ))}
    </Fragment>
  );
};

export default VideoList;
