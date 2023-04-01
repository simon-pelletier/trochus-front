import React, { useState, useRef, useCallback, useEffect } from "react";

import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
const { Header } = Layout;
import {
  UserOutlined,
  DatabaseOutlined,
  DisconnectOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import SignModal from "../SignModal";

import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../features/auth/authActions";

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const HeaderComp = () => {
  const navigate = useNavigate();
  const signModalRef = useRef(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const [current, setCurrent] = useState("home");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length && success) {
      setIsLogged(true);
    }
  }, [success, userInfo]);

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
    //* Moved to profil menu
    // getItem("Mes objets", "/items", "items", null, null, !isLogged),
    // getItem("Mes demandes", "/requests", "requests", null, null, !isLogged),
  ];

  const profilMenuItems = [
    {
      label: "Mon Profil",
      key: "profil",
      icon: <UserOutlined />,
      path: "/profil",
    },
    {
      label: "Mes objets",
      key: "items",
      icon: <DatabaseOutlined />,
      path: "/items",
    },
    {
      label: "Mes demandes",
      key: "requests",
      icon: <HeartOutlined />,
      path: "/requests",
    },
    {
      type: "divider",
    },
    {
      label: "Se déconnecter",
      key: "logout",
      icon: <DisconnectOutlined />,
      danger: true,
    },
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
      {!isLogged && (
        <>
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
        </>
      )}
      {isLogged && (
        <Dropdown
          menu={{
            items: profilMenuItems,
          }}
          trigger={["click"]}
        >
          <Avatar className="avatar" icon={<UserOutlined />} />
        </Dropdown>
      )}

      <SignModal ref={signModalRef} />
    </Header>
  );
};

export default HeaderComp;
