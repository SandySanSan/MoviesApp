import React from "react";
import SearchBar from "./SearchBar";
import "./header.css";
import { Layout, Menu } from "antd";

const Header = ({ searchVideo }) => {
  const { Header } = Layout;
  return (
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        // defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}>
        <Menu.Item key='1'>Nav1</Menu.Item>
        <Menu.Item key='2'>nav 2</Menu.Item>
        <Menu.Item key='3'>nav 3</Menu.Item>
        <Menu.Item key='4'>
          <SearchBar searchVideo={searchVideo} />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;
