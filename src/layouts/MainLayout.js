import React from "react";
import { Outlet } from "react-router-dom";

import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

import "./style.scss";

function MainLayout() {
  return (
    <Layout className="main-layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        className="content-layout"
        style={{
          padding: "40px",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Trochus ©2023 Created by Simon Pelletier
      </Footer>
    </Layout>
  );
}

export default MainLayout;
