import React, { Component } from "react";
import axios from "axios";
import { List, Pagination, Icon, Row, Col, Layout, Typography } from "antd";
import Header from "./components/Header";

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const API_END_POINT = "https://api.themoviedb.org/3/";
const ALL_MOVIES_URL = "discover/movie?";

const { Title } = Typography;

class AllMoviesList extends Component {
  state = { allMovies: [], current: 1, totalResults: "" };

  componentDidMount() {
    this.initLatestMovies();
  }

  initLatestMovies = () => {
    axios
      .get(
        `${API_END_POINT}${ALL_MOVIES_URL}api_key=${API_KEY}&sort_by=original_title.asc&include_adult=false&page=${this.state.current}`
      )
      .then(resp =>
        this.setState({ allMovies: resp.data.results, totalResults: resp.data.total_results })
      );
  };

  onChange = page => {
    this.setState(
      {
        current: page
      },
      () => this.initLatestMovies()
    );
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.current !== nextState.current;
  // }

  render() {
    const { allMovies } = this.state;

    const listData = allMovies.map(movie => ({
      title: `${movie.title}`,
      content: `${movie.overview}`
    }));

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const styleSpacing = { marginTop: "40px" };

    return (
      <Layout>
        <Header
        // searchVideo={searchVideo}
        />
        <Row style={styleSpacing}>
          <Col span={12} offset={6}>
            <Pagination
              defaultCurrent={1}
              current={this.state.current}
              onChange={this.onChange}
              total={500}
            />

            <List
              itemLayout='vertical'
              size='large'
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 25
              }}
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText type='like-o' text={item.vote_count} key='list-vertical-like-o' />,
                    <IconText type='message' text='2' key='list-vertical-message' />
                  ]}
                  extra={
                    item.poster_path === null ? (
                      <img
                        width={92}
                        alt='logo'
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      />
                    ) : (
                      <Icon type='picture' style={{ fontSize: 92 }} />
                    )
                  }>
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default AllMoviesList;
