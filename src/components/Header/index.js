import React, { useState, useEffect } from "react";

import { Layout, Menu, Button } from "antd";
const { Header } = Layout;
import { useNavigate } from "react-router-dom";

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const HeaderComp = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("home");

  //* TODO: A connecter avec le store
  const isConnected = false;

  function getItem(label, path, key, icon, children, disabled) {
    return {
      key,
      path,
      icon,
      children,
      label,
      disabled,
    };
  }

  const items = [
    getItem("Accueil", "/", "home"),
    getItem("Le marché", "/market", "market"),
    getItem("Mes objets", "/items", "items", null, null, !isConnected),
    getItem("Mes demandes", "/requests", "requests", null, null, !isConnected),
  ];

  const handleClickMenu = (e) => {
    navigate(e.item.props.path);
    setCurrent(e.key);
  };

  const homeClic = () => {
    navigate("/");
    setCurrent("home");
  };

  const handleConnect = () => {
    //* TODO: Pouvoir se connecter / déconnecter
    console.log("Connect");
  };

  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="Trochus_logo" onClick={homeClic} />
      </div>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        onClick={handleClickMenu}
        items={items}
      />
      <Button type="primary" onClick={handleConnect}>
        Se connecter
      </Button>
    </Header>
  );
};

export default HeaderComp;
