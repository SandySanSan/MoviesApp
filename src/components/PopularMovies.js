import React from "react";
import { Carousel, Typography, Button, Spin } from "antd";
import "./carousel.css";
import "./global.css";
const { Paragraph } = Typography;

const PopularMovies = ({ popularMovies, loading }) => (
  <div>
    <Spin spinning={loading}>
      <Carousel autoplay effect='fade'>
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
                  <a href={`/movie-details/${movie.id}`}>More details</a>
                </Button>
              </div>
            </div>
          ))}
      </Carousel>
    </Spin>
  </div>
);

export default PopularMovies;
