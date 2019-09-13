import React, { Fragment } from "react";
import { Carousel, Typography, Tag } from "antd";
import "./carousel.css";
const { Title } = Typography;

const PopularMovies = ({ popularMovies }) => (
  <Fragment>
    <Carousel autoplay effect='fade'>
      {popularMovies.map(movie => (
        <Fragment>
          <div className='carousel-container'>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className='poster-carousel'
            />
            <div className='tag-block'>
              <Title level={4}>MOST POPULAR MOVIES</Title>
            </div>
            <div className='text-block'>
              <Title>{movie.title}</Title>
              <p>{movie.overview}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </Carousel>
  </Fragment>
);

export default PopularMovies;
