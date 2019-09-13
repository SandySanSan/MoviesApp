import React from "react";
import { Typography, Row, Rate, Tabs, Icon, Table, Tag } from "antd";
import "./videoList.css";

const { Title } = Typography;
const { TabPane } = Tabs;

const VideoDetails = ({ currentMovie, youtubeKey }) => {
  const BASE_URL = "https://www.youtube.com/embed/";
  const computeStars = average => Math.round(average / 2, 1);

  const columns = [
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
    currentMovie.credits.map((actor, index) => ({
      key: `${index}`,
      name: `${actor.name}`,
      character: `${actor.character}`
    }));

  return (
    <Row style={{ padding: "10px" }}>
      <iframe
        width='100%'
        height='600px'
        autoPlay={false}
        title='video'
        src={`${BASE_URL}${youtubeKey}`}
      />
      <Title level={2} style={{ paddingTop: "10px" }}>
        {currentMovie.title} ({currentMovie.release_date && currentMovie.release_date.slice(0, 4)})
      </Title>
      <Rate disabled allowHalf value={currentMovie && computeStars(currentMovie.vote_average)} />
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
