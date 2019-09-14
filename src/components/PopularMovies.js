import React, { Fragment } from "react";
import { Carousel, Typography, Button } from "antd";
import "./carousel.css";
const { Title, Paragraph } = Typography;

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
              <Title level={4}>MOST POPULAR MOVIES</Title>
            </div>
            <div className='text-block'>
              <Title>{movie.title}</Title>
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
