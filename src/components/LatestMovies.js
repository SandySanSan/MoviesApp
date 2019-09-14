import React from "react";
import { Link } from "react-router-dom";
import { Row, Card } from "antd";

const gridStyle = {
  width: "16.66%",
  textAlign: "center"
};
const LatestMovies = ({ nowPlaying }) => (
  <div style={{ background: "#ECECEC", padding: "20px", paddingTop: "30px" }}>
    <Row gutter={16}>
      <Card title='Now playing'>
        {nowPlaying.map(item => (
          <Card.Grid style={gridStyle} hoverable key={item.poster_path}>
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
