import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Layout } from "antd";

const ResultsList = ({ searchresults, text }) => {
  const gridStyle = {
    width: "25%",
    textAlign: "center"
  };
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <Row gutter={5} style={{ width: "80vw" }}>
          <Card title={`Results for ${text}`}>
            {searchresults.map(result => (
              <Col span={4} style={{ padding: "10px" }}>
                <Link to={`/movie-details/${result.id}`}>
                  <Card
                    hoverable
                    style={{ width: 185 }}
                    cover={
                      <img
                        alt='logo'
                        src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                      />
                    }>
                    {result.title}
                  </Card>
                </Link>
              </Col>
            ))}
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};

export default ResultsList;
