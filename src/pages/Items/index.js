import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Divider, List, Button } from "antd";

import Item from "../../components/Item";

import "./style.scss";

function Items() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${process.env.API_URL}/items/user/${currentUser.userInfo.id}`)
        .then((res) => {
          setUserItems(res.data);
        });
    }
  }, [currentUser]);

  const addItem = () => {
    navigate("/additem");
  }

  return (
    <div className="page-container">
      <div className="header">
      <h1>Objets</h1>
      <Button type="primary" className="add-button" onClick={addItem}>Ajouter un objet</Button>
      </div>
      {currentUser ? (
        <div className="content">
          
          <Divider orientation="left">Objets non échangés</Divider>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
            }}
            itemLayout="horizontal"
            locale={{ emptyText: "Aucun objet non échangé" }}
            dataSource={userItems.filter((item) => !item.traded)}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Item item={item} />
              </List.Item>
            )}
          />
          <Divider orientation="left">Objets échangés</Divider>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
            }}
            locale={{ emptyText: "Aucun objet échangé" }}
            dataSource={userItems.filter((item) => item.traded)}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Item item={item} />
              </List.Item>
            )}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Items;
