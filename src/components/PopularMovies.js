import React, { Fragment } from "react";
import { Carousel, Typography, Button } from "antd";
import "./carousel.css";
import "./global.css";
const { Paragraph } = Typography;

const PopularMovies = ({ popularMovies }) => (
  <Fragment>
    <Carousel autoplay effect='fade'>
      {popularMovies.map(movie => (
        <Fragment key={movie.poster_path}>
          <div className='carousel-container'>
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
        </Fragment>
      ))}
    </Carousel>
  </Fragment>
);

export default PopularMovies;
