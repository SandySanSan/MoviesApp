import React from "react";
import { Carousel, Typography, Button, Icon } from "antd";
import "./carousel.css";
import "./global.css";
const { Paragraph } = Typography;

const PopularMovies = ({ popularMovies, loading }) => {
  let carousel = React.createRef();

  function next() {
    carousel.next();
  }
  function previous() {
    carousel.prev();
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Button
        onClick={() => next()}
        type='link'
        style={{
          top: "33%",
          right: "4%",
          position: "absolute",
          zIndex: 3
        }}>
        <Icon
          type='right'
          style={{
            fontSize: "44px",
            color: "lime"
          }}
        />
      </Button>
      <Carousel autoplay effect='fade' ref={node => (carousel = node)} speed='500'>
        {popularMovies &&
          popularMovies.map(movie => (
            <div className='carousel-container' key={movie.poster_path}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className='poster-carousel'
              />
              <div className='tag-block'>
                <h4 style={{ color: "white" }}>
                  <b>MOST POPULAR MOVIES</b>
                </h4>
              </div>
              <div className='text-block'>
                <div className='movies-title'>{movie.title}</div>
                <Paragraph ellipsis={{ rows: 3, expandable: false }}>{movie.overview}</Paragraph>
                <Button>
                  <a href={`/movie-details/${movie.id}/movie`}>More details</a>
                </Button>
              </div>
            </div>
          ))}
      </Carousel>
      <Button
        onClick={() => previous()}
        type='link'
        style={{
          top: "33%",
          left: "4%",
          position: "absolute",
          zIndex: 3
        }}>
        <Icon
          type='left'
          style={{
            fontSize: "44px",
            color: "lime"
          }}
        />
      </Button>
    </div>
  );
};

export default PopularMovies;
