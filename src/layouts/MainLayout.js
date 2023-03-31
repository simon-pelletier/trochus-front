import React from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
const { Content } = Layout;

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./style.scss";

function MainLayout() {
  return (
    <Layout className="main-layout">
      <Header />
      <Content className="content-layout">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default MainLayout;
