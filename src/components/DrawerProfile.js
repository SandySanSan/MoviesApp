import React from "react";

import { Drawer, Col, Row, Divider, Typography, Empty } from "antd";
const { Title } = Typography;

const DrawerProfile = ({ visible, onClose, person }) => {
  const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: "18px",
        marginBottom: 7,
        color: "rgba(0,0,0,0.65)"
      }}>
      <p
        style={{
          marginRight: 8,
          display: "inline-block",
          color: "rgba(0,0,0,0.85)"
        }}>
        {title}:
      </p>
      {content}
    </div>
  );

  return (
    <div>
      <Drawer width={640} placement='right' closable={false} onClose={onClose} visible={visible}>
        <Row>
          <Col span={24}>
            {person.profile_path && (
              <img src={`http://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            )}
            <Divider />
            <Title className='movies-title' style={{ paddingTop: 5 }}>
              {person.name}
            </Title>
          </Col>
        </Row>
        <Row>
          {!person.profile_path &&
            !person.birthday &&
            !person.deathday &&
            !person.place_of_birth &&
            !person.biography && <Empty />}
          {person.birthday && (
            <Col span={12}>
              <DescriptionItem title='Birthday' content={person.birthday} />
            </Col>
          )}
          {person.deathday && (
            <Col span={12}>
              <DescriptionItem title='Deathday' content={person.deathday} />
            </Col>
          )}
        </Row>
        <Row>
          {person.place_of_birth && (
            <Col span={24}>
              <DescriptionItem title='Place of Birth' content={person.place_of_birth} />
            </Col>
          )}
        </Row>

        <Row>
          {person.biography && (
            <Col span={24}>
              <DescriptionItem title='Biography' content={person.biography} />
            </Col>
          )}
        </Row>
        <Divider />
      </Drawer>
    </div>
  );
};

export default DrawerProfile;
