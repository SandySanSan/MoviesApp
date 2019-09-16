import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
import { Layout, Menu } from "antd";

const HeaderSearchResults = () => {
  const { Header } = Layout;
  return (
    <Header className='header'>
      <Link to='/'>
        <div className='logo' />
      </Link>
      <Menu
        theme='dark'
        mode='horizontal'
        // defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}>
        {/* <Menu.Item key='1'>
          <Link to='/movies-list'>All the Movies</Link>
        </Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default HeaderSearchResults;
