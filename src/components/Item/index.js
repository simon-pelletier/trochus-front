import React from "react";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
require("dayjs/locale/fr");

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Tag } from "antd";
const { Meta } = Card;

import logo from "../../assets/favicons/favicon-32x32-default.png";

import "./style.scss";

const Item = ({ item, isMarket }) => {
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

  const coverPicture = item.Images[0]?.filename
    ? `${process.env.API_STATIC_URL}/images/${item.Images[0]?.filename}`
    : `${process.env.API_STATIC_URL}/public/default.jpg`;

  const actions = !isMarket
    ? [
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]
    : null;

  return (
    <Card
      actions={actions}
      className="card"
      cover={
        <div className="card-cover">
          <img alt={`${item.name}-image`} src={`${coverPicture}`} />
        </div>
      }
    >
      <Meta title={item.name} className="meta" />
      <div className="card-content">
        <div className="infos">
          <div className="estimation">
            <Tag className="estimation-tag">
              <img src={logo} alt="Trochus_logo" className="logo" />
              <span className="estimation-text">{item.estimation}</span>
            </Tag>
          </div>
          <div className="user">
            <Tag color="black" className="user-tag">
              {item.User?.pseudo}
            </Tag>
          </div>
          <div className="condition">
            <Tag color={tagColor(item.condition)} className="condition-tag">
              {tagLabel(item.condition)}
            </Tag>
          </div>
        </div>
        <div className="categories">
          {item.Categories?.map((category) => (
            <Tag color="grey" key={`${category.id}-${item.id}`}>
              {category?.label}
            </Tag>
          ))}
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
