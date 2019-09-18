import React from "react";
import { List, Col, Row, Icon } from "antd";

const Trendings = ({ trending, trendingPersons }) => {
  const data = trending.map(item => ({
    title: `${item.title}`,
    popularity: `${item.popularity}`,
    id: `${item.id}`
  }));
  const dataPerson = trendingPersons.map(item => ({
    name: `${item.name}`,
    popularity: `${item.popularity}`
  }));

  return (
    <Row style={{ padding: "40px 20px 200px 20px", background: "rgb(255, 255,255, 0.1)" }}>
      <div className='tag-title'>
        <h4 style={{ color: "white" }}>
          <b>TRENDING OF THE DAY</b>
        </h4>
      </div>
      <Col md={12} sm={24} style={{ padding: "50px 40px 0 0" }}>
        <List
          itemLayout='horizontal'
          header={<div>MOVIES</div>}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href={`/movie-details/${item.id}/movie`}>{item.title}</a>}
              />
              <div>
                <h4>
                  <Icon type='like' /> {item.popularity}
                </h4>
              </div>
            </List.Item>
          )}
        />
      </Col>
      <Col md={12} sm={24} style={{ padding: "50px 40px 0 0 " }}>
        <List
          itemLayout='horizontal'
          header={<div>PEOPLE</div>}
          dataSource={dataPerson}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.name} />
              <div>
                <h4>
                  <Icon type='like' /> {item.popularity}
                </h4>
              </div>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default Trendings;
