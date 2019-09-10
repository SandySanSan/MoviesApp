import React from "react";
import { Row, Card } from "antd";

const gridStyle = {
  width: "16.66%",
  textAlign: "center"
};
const LatestMovies = ({ nowPlaying, handleClickCurrent }) => (
  <div style={{ background: "#ECECEC", padding: "30px" }}>
    <Row gutter={16}>
      <Card title='Now playing'>
        {nowPlaying.map(item => (
          // <Link to='/details'>
          <Card.Grid
            style={gridStyle}
            hoverable
            onClick={() => handleClickCurrent(item)}
            key={item.poster_path}>
            <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} alt={item.title} />
          </Card.Grid>
          // </Link>
        ))}
      </Card>
    </Row>
  </div>
);
export default LatestMovies;
