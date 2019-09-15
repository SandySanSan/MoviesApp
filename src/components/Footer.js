import React from "react";
import { Row, Col, Typography } from "antd";
import logoAntD from "../img/ant-design.svg";
import logoMovieDb from "../img/movie-db.svg";
import logoReact from "../img/logo-react.png";

const { Text } = Typography;
const FooterCredits = () => {
  return (
    <Row>
      <Col span={24}>
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          <img
            src={logoReact}
            alt='logo react'
            height='35'
            width='auto'
            style={{ paddingRight: "10px" }}
          />
          <a href='https://ant.design/' target='blank'>
            <img
              src={logoAntD}
              alt='logo AntDesign'
              height='35'
              width='auto'
              style={{ paddingRight: "15px" }}
            />
          </a>
          <a href='https://www.themoviedb.org/documentation/api' target='blank'>
            <img src={logoMovieDb} alt='logo Movie Database' height='35' width='auto' />
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <Text type='secondary'>Made with love (and React) by Prolhac Sandy</Text>
        </div>
      </Col>
    </Row>
  );
};

export default FooterCredits;
