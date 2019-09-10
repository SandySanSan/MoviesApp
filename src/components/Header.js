import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

import "./header.css";
import { Layout, Menu } from "antd";

const Header = ({ searchVideo }) => {
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
        <Menu.Item key='1'>
          <Link to='/movies-list'>All the Movies</Link>
        </Menu.Item>
        <Menu.Item key='2'>nav 2</Menu.Item>
        <Menu.Item key='3'>
          <SearchBar searchVideo={searchVideo} />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;
