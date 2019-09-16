import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

import "./header.css";
import { Layout, Menu } from "antd";

const Header = () => {
  const { Header } = Layout;
  return (
    <Header className='header'>
      <Link to='/'>
        <div className='logo' />
      </Link>
      <Menu theme='dark' mode='horizontal' style={{ lineHeight: "64px" }}>
        <Menu.Item key='3' style={{ width: "30vw" }}>
          <SearchBar />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;
