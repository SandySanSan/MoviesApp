import React from "react";
import { Typography, Row, Statistic, Rate, Tabs, Icon, Table, Tag, Col, BackTop } from "antd";
import "./videoList.css";
import DrawerProfile from "./DrawerProfile";

const { Title } = Typography;
const { TabPane } = Tabs;
const BASE_URL = "https://www.youtube.com/embed/";

const VideoDetails = ({
  currentMovie,
  youtubeKey,
  data,
  computeStars,
  directorName,
  columns,
  visible,
  onClose,
  showDrawer,
  person,
  dataCrew,
  columnsCrew
}) => {
  return (
    <Row style={{ padding: "10px" }}>
      <BackTop />
      <Row>
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
            alt={currentMovie.title}
          />
        )}
      </Row>
      <Row>
        <Col span={20}>
          <Title level={2} style={{ paddingTop: "10px" }}>
            {currentMovie.title} (
            {currentMovie.release_date && currentMovie.release_date.slice(0, 4)})
          </Title>
        </Col>
        <Col span={4}>
          <div>
            <Rate
              disabled
              allowHalf
              value={currentMovie && computeStars(currentMovie.vote_average)}
            />
          </div>
          <div>
            <Statistic value={currentMovie.vote_count} prefix={<Icon type='like' />} />
          </div>
        </Col>
      </Row>
      <Tag color='green'>
        Directed by {currentMovie.credits && directorName.map(director => `${director.name} `)}
      </Tag>
      <p style={{ padding: "20px 0 30px 0" }}>{currentMovie.overview}</p>
      <p>Keywords :</p>
      <div style={{ padding: "0 0 30px 0" }}>
        {currentMovie.keywords &&
          currentMovie.keywords.map(keyword => (
            <Tag key={keyword.name} style={{ marginBottom: "8px" }}>
              {keyword.name}
            </Tag>
          ))}
      </div>

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
      <DrawerProfile visible={visible} onClose={onClose} showDrawer={showDrawer} person={person} />
    </Row>
  );
};

export default VideoDetails;
