import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Layout, Typography } from "antd";
import noImage from "../img/noImage.jpg";

const ResultsList = ({ searchresults, text }) => {
  const gridStyle = {
    width: "16%",
    textAlign: "center"
  };
  const { Content } = Layout;
  const { Paragraph } = Typography;

  const resultsList = searchresults.results;
  return (
    <Layout>
      <Content>
        <Row style={{ width: "90vw" }}>
          <Col>
            <Card title={`${searchresults.total_results} results for "${text}" `}>
              {searchresults.results &&
                resultsList.map(result => (
                  <Card.Grid style={gridStyle} key={`${result.title}${result.poster_path}`}>
                    <Link to={`/movie-details/${result.id}`}>
                      <div>
                        {result.poster_path ? (
                          <img
                            alt='logo'
                            src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                            height='278px'
                            width='185px'
                          />
                        ) : (
                          <img src={noImage} alt='Pas de miniature pour ce film' />
                        )}
                      </div>
                      <Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: "10px" }}>
                        {result.title}
                      </Paragraph>
                    </Link>
                  </Card.Grid>
                ))}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ResultsList;
