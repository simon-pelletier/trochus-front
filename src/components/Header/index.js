import React, { useState, useRef, useCallback } from "react";

import { Layout, Menu, Button } from "antd";
const { Header } = Layout;
import { useNavigate } from "react-router-dom";

import SignModal from "../SignModal";

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const HeaderComp = () => {
  const navigate = useNavigate();
  const signModalRef = useRef(null);

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
    getItem("Trochus", "/", "home"),
    getItem("Le marché", "/market", "market"),
    getItem("Mes objets", "/items", "items", null, null, !isConnected),
    getItem("Mes demandes", "/requests", "requests", null, null, !isConnected),
  ];

  const handleClickMenu = useCallback((e) => {
    navigate(e.item.props.path);
    setCurrent(e.key);
  }, []);

  const homeClic = useCallback(() => {
    navigate("/");
    setCurrent("home");
  }, []);

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
      <Button
        type="primary"
        onClick={() => signModalRef.current.signin()}
        className="button"
      >
        Se connecter
      </Button>
      <Button
        type="primary"
        onClick={() => signModalRef.current.signup()}
        className="button"
      >
        S'inscrire
      </Button>
      <SignModal ref={signModalRef} />
    </Header>
  );
};

export default HeaderComp;
