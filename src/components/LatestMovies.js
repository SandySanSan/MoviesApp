import React from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col } from "antd";

const LatestMovies = ({ nowPlaying }) => (
  <div style={{ background: "rgb(255, 255,255, 0.1)", padding: "20px" }}>
    <Row gutter={16}>
      <div className='tag-title'>
        <h4 style={{ color: "white" }}>
          <b>NOW PLAYING IN THEATERS</b>
        </h4>
      </div>
      {nowPlaying.map(item => (
        <Col xs={24} sm={8} md={6} lg={3} xl={3}>
          <Link to={`/movie-details/${item.id}/movie`}>
            <Card
              hoverable
              bordered={false}
              style={{ backgroundColor: "rgb(255, 255,255, 0.0)" }}
              size='small'
              cover={
                <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} alt={item.title} />
              }></Card>
          </Link>
        </Col>
      ))}
    </Row>
  </div>
);
export default LatestMovies;
