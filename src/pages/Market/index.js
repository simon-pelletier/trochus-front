import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "antd";

import Item from "../../components/Item";

import "./style.scss";

function Market() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/items`).then((res) => {
      console.log("items res HOME", res);
      setItems(res.data);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="header">
        <h2>Le marché : </h2>
      </div>
      <div className="content">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          itemLayout="horizontal"
          locale={{ emptyText: "Aucun objet non échangé" }}
          dataSource={items.filter((item) => !item.traded)}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Item item={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Market;
