import React from "react";

import dayjs from "dayjs";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Tag } from "antd";
const { Meta } = Card;

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const Item = ({ item }) => {
  console.log("ITEM", item);
  const tagColor = (condition) => {
    switch (condition) {
      case "neuf":
        return "green";
      case "excellent":
        return "cyan";
      case "bon":
        return "blue";
      case "moyen":
        return "orange";
      case "mauvais":
        return "red";
      default:
        return "green";
    }
  };

  const timestampToDate = (timestamp) => {
    return dayjs(timestamp).format("DD/MM/YYYY");
  };

  return (
    <Card
      actions={
        [
          // <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
        ]
      }
      className="card"
      cover={
        <img
          alt={`${item.name}-image`}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        title={item.name}
        className="meta"
      />
      <div className="content">
        <Tag color={tagColor(item.condition)} className="condition-tag">
          {item.condition}
        </Tag>
        <div className="estimation">
        <img src={logo} alt="Trochus_logo" className="logo"/><span className="estimation-text">{item.estimation}</span>
        </div>
        <div className="update-date">
          Mis à jour le {dayjs(item.updatedAt).format("DD/MM/YYYY")}
        </div>
      </div>
    </Card>
  );
};

export default Item;
