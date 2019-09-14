import React from "react";
import { Typography, Row, Rate, Tabs, Icon, Table, Tag, Col } from "antd";
import "./videoList.css";
import noImage from "../img/noImage-profile.jpg";

const { Title } = Typography;
const { TabPane } = Tabs;

const VideoDetails = ({ currentMovie, youtubeKey }) => {
  const BASE_URL = "https://www.youtube.com/embed/";
  const computeStars = average => Math.round(average / 2, 1);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo"
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Character",
      dataIndex: "character"
    }
  ];

  const data =
    currentMovie.credits &&
    currentMovie.credits.cast.map((actor, index) => {
      const img = actor.profile_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w45${actor.profile_path}`}
          alt={actor.profile_path}
          className='avatar-img-round'
        />
      ) : (
        <img src={noImage} alt='no profile provided' />
      );
      return {
        key: `${index}`,
        name: `${actor.name}`,
        character: `${actor.character}`,
        photo: img
      };
    });

  const directorName =
    currentMovie.credits && currentMovie.credits.crew.filter(crew => crew.job === "Director");

  return (
    <Row style={{ padding: "10px" }}>
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
      <Row>
        <Col span={20}>
          <Title level={2} style={{ paddingTop: "10px" }}>
            {currentMovie.title} (
            {currentMovie.release_date && currentMovie.release_date.slice(0, 4)})
          </Title>
        </Col>
        <Col span={4}>
          <Rate
            disabled
            allowHalf
            value={currentMovie && computeStars(currentMovie.vote_average)}
          />
        </Col>
      </Row>
      <Tag color='green'>
        DIRECTOR :{currentMovie.credits && directorName.map(director => director.name)}
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

      <Tabs defaultActiveKey='1'>
        <TabPane
          tab={
            <span>
              <Icon type='team' />
              Credits
            </span>
          }
          key='1'>
          <Table columns={columns} dataSource={data} size='middle' />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type='android' />
              Tab 2
            </span>
          }
          key='2'>
          Tab 2
        </TabPane>
      </Tabs>
    </Row>
  );
};

export default VideoDetails;
