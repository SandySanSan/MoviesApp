import React, { Fragment } from "react";
import { Typography, Row, Col, Rate } from "antd";
import noImage from "../img/noImage.jpg";
import "./videoList.css";
const { Title } = Typography;

const VideoList = ({ recoMovies, handleClickCurrent, computeStars }) => {
  return (
    <Fragment>
      <Row style={{ backgroundColor: "rgba(122, 122, 122, 0.1)", padding: "10px" }}>
        RECOMMENDATIONS
      </Row>
      {recoMovies.map(item => (
        <div key={`${item.name}-${item.poster_path}`}>
          <Row className='hoverableRow' onClick={() => handleClickCurrent(item)}>
            <Col span={5} style={{ marginRight: "15px" }}>
              {item.poster_path ? (
                <img alt={item.title} src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} />
              ) : (
                <img src={noImage} height='138' width='92' alt='no poster provided' />
              )}
            </Col>
            <Col>
              <Title level={4}>
                {item.title} ({item.release_date.slice(0, 4)})
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
