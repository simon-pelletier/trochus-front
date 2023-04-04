import React from "react";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
require("dayjs/locale/fr");

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Tag } from "antd";
const { Meta } = Card;

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const Item = ({ item }) => {
  console.log("ITEM", item);
  const tagColor = (condition) => {
    switch (condition) {
      case "new":
        return "green";
      case "very_good":
        return "cyan";
      case "good":
        return "blue";
      case "average":
        return "orange";
      case "bad":
        return "red";
      default:
        return "blue";
    }
  };

  const tagLabel = (condition) => {
    switch (condition) {
      case "new":
        return "Neuf";
      case "very_good":
        return "Excellent état";
      case "good":
        return "Bon état";
      case "average":
        return "État correct";
      case "bad":
        return "Mauvais état";
      default:
        return "État inconnu";
    }
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
      <Meta title={item.name} className="meta" />
      <div className="card-content">
        <Tag color={tagColor(item.condition)} className="condition-tag">
          {tagLabel(item.condition)}
        </Tag>
        <div className="estimation">
          <img src={logo} alt="Trochus_logo" className="logo" />
          <span className="estimation-text">{item.estimation}</span>
        </div>
        <div className="update-date">
          Mis à jour il y a{" "}
          {dayjs().locale("fr").from(dayjs(item.updatedAt), true)}
        </div>
      </div>
    </Card>
  );
};

export default Item;
