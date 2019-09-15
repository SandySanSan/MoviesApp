import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "antd";

const gridStyle = {
  width: "16.66%",
  textAlign: "center"
};
const LatestMovies = ({ nowPlaying }) => (
  <div style={{ background: "rgb(2, 21, 41,0)", padding: "20px 10px 20px 10px" }}>
    <Row gutter={16}>
      <Card style={{ backgroundColor: "rgb(2, 21, 41,0)", border: 0 }} bordered={false}>
        <div className='tag-title'>
          <h4 style={{ color: "white" }}>
            <b>NOW PLAYING IN THEATERS</b>
          </h4>
        </div>
        {nowPlaying.map(item => (
          <Card.Grid style={gridStyle} key={item.poster_path}>
            <Link to={`/movie-details/${item.id}`}>
              <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} alt={item.title} />
            </Link>
          </Card.Grid>
        ))}
      </Card>
    </Row>
  </div>
);
export default LatestMovies;
