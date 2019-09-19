import React from "react";
import {
  Typography,
  Row,
  Tooltip,
  Tabs,
  Icon,
  Table,
  Tag,
  Col,
  BackTop,
  Button,
  Divider,
  Progress,
  Card
} from "antd";
import "./videoList.css";
import DrawerProfile from "./DrawerProfile";
import DrawerReviews from "./DrawerReviews";
import noImage from "../img/noImage.jpg";

const { Title } = Typography;
const { TabPane } = Tabs;
const BASE_URL = "https://www.youtube.com/embed/";

const TvShowDetails = ({
  currentMovie,
  youtubeKey,
  data,
  columns,
  visible,
  reviewsVisible,
  onClose,
  showDrawerReviews,
  person,
  dataCrew,
  columnsCrew
}) => {
  return (
    <Row style={{ padding: "10px" }}>
      <BackTop />
      <Row>
        {console.log(currentMovie)}
        {currentMovie && youtubeKey !== "" ? (
          <iframe
            width='100%'
            height='600px'
            autoPlay={false}
            title='video'
            src={`${BASE_URL}${youtubeKey}`}
          />
        ) : (
          <img
            src={`http://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.name}
          />
        )}
      </Row>

      <Row type='flex' justify='space-start' align='middle'>
        <Col span={18}>
          <Title level={1} style={{ padding: "30px 0 10px 0" }} className='movies-title'>
            {currentMovie.name} (
            {currentMovie.first_air_date && currentMovie.first_air_date.slice(0, 4)})
          </Title>
        </Col>
        <Col span={3}>
          <div>
            <h2>
              <Tooltip title='Popularity' placement='bottom'>
                <Icon type='like' /> {currentMovie.popularity}
              </Tooltip>
            </h2>
          </div>
        </Col>
        <Col span={3}>
          <Tooltip title='Users score' placement='bottom'>
            <Progress
              type='circle'
              percent={currentMovie.vote_average * 10}
              width={65}
              strokeColor='lime'
              strokeWidth={20}
              style={{ borderRadius: "50%" }}
            />
          </Tooltip>
        </Col>
      </Row>

      {currentMovie.created_by && currentMovie.created_by.length !== 0 ? (
        <h3 style={{ fontWeight: "bold", paddingTop: "20px" }}>
          Created by {currentMovie.created_by.map(director => `${director.name} `)}
        </h3>
      ) : (
        ""
      )}
      <p style={{ paddingBottom: "20px" }}>{currentMovie.overview}</p>
      {currentMovie.id && currentMovie.reviews && currentMovie.reviews.length !== 0 ? (
        <Button onClick={showDrawerReviews} icon='read' ghost>
          REVIEWS
        </Button>
      ) : (
        ""
      )}
      <Divider />
      {currentMovie.keywords && currentMovie.keywords.length !== 0 ? (
        <div>
          <h4 style={{ fontWeight: "bold" }}>Keywords </h4>
          <div>
            {currentMovie.keywords &&
              currentMovie.keywords.map(keyword => (
                <Tag
                  key={keyword.name}
                  style={{ marginBottom: "8px", backgroundColor: "#8f919c" }}
                  ghost>
                  {keyword.name}
                </Tag>
              ))}
          </div>
          <Divider />
        </div>
      ) : (
        ""
      )}
      {!data && !dataCrew ? (
        ""
      ) : (
        <Tabs defaultActiveKey='1' tabPosition='left' forceRender={true}>
          <TabPane
            tab={
              <span>
                <Icon type='team' />
                Cast
              </span>
            }
            key='1'>
            <Table columns={columns} dataSource={data} size='middle' pagination={{ pageSize: 5 }} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type='video-camera' />
                Crew
              </span>
            }
            key='2'>
            <Table
              columns={columnsCrew}
              dataSource={dataCrew}
              size='middle'
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      )}
      <DrawerReviews
        currentMovie={currentMovie}
        visible={reviewsVisible}
        onClose={onClose}
        person={person}
      />

      <DrawerProfile visible={visible} onClose={onClose} person={person} />
      <Card
        title='SEASONS'
        style={{ backgroundColor: "rgb(255, 255, 255, 0.1)", marginTop: "25px" }}
        bordered={false}>
        <Row>
          {currentMovie.seasons &&
            currentMovie.seasons.map(item => (
              <div key={`${item.name}-${item.poster_path}`}>
                <Col span={4} style={{ padding: "10px" }}>
                  <Card
                    bordered={false}
                    style={{ backgroundColor: "rgb(255, 255, 255, 0.3)" }}
                    cover={
                      item.poster_path ? (
                        <img
                          alt={item.name}
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          style={{ padding: "15px", objectFit: "contain" }}
                        />
                      ) : (
                        <img
                          src={noImage}
                          alt='no poster provided'
                          style={{ padding: "15px", objectFit: "contain" }}
                        />
                      )
                    }
                    size='small'>
                    <Title level={4}>
                      {item.name} ({item.air_date && item.air_date.slice(0, 4)})
                    </Title>
                    <p>{item.episode_count && item.episode_count} episode(s)</p>
                  </Card>
                </Col>
              </div>
            ))}
        </Row>
      </Card>
    </Row>
  );
};

export default TvShowDetails;
