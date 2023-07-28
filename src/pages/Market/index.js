import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Select, Divider } from "antd";

import Item from "../../components/Item";

import "./style.scss";

function Market() {
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  const [sortValue, setSortValue] = useState("price-asc");
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/categories`).then((res) => {
      setCategories(res.data);
    });
    axios.get(`${process.env.API_URL}/items/published`).then((res) => {
      setItems(res.data);
      setData(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filteredItems = items.filter((item) => {
      if (filterValue.length === 0) {
        return item;
      }
      return item.Categories.some((category) =>
        filterValue.includes(`${category.id}`)
      );
    });
    const sortedItems = sortItems(filteredItems);
    setData(sortedItems);
  }, [filterValue]);

  useEffect(() => {
    const sortedItems = sortItems(data);
    setData(sortedItems);
  }, [loading, sortValue]);

  const sortItems = (itemsToSort) => {
    const sortedItems = [...itemsToSort];
    if (sortValue === "price-asc") {
      sortedItems.sort((a, b) => {
        return a.estimation - b.estimation;
      });
    } else if (sortValue === "price-desc") {
      sortedItems.sort((a, b) => {
        return b.estimation - a.estimation;
      });
    } else if (sortValue === "date-asc") {
      sortedItems.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else if (sortValue === "date-desc") {
      sortedItems.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    return sortedItems;
  };

  return (
    <div className="page-container">
      <div className="header">
        <h2>Le marché : </h2>
      </div>
      <div className="content">
        <h4>Filtres : </h4>
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          placeholder="Selectionnez une ou plusieurs catégories"
          options={categories.map((category) => {
            return { label: category.label, value: `${category.id}` };
          })}
          onChange={(value) => setFilterValue(value)}
        />
        <Select
          style={{
            width: "100%",
          }}
          placeholder="Trier par"
          defaultValue={"price-asc"}
          options={[
            { label: "Prix croissant", value: "price-asc" },
            { label: "Prix décroissant", value: "price-desc" },
            { label: "Du plus ancien au plus récent", value: "date-asc" },
            { label: "Du plus récent au plus ancien", value: "date-desc" },
          ]}
          onChange={(value) => setSortValue(value)}
        />
        <Divider />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          loading={loading}
          itemLayout="horizontal"
          locale={{ emptyText: "Aucun objet trouvé" }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Item item={item} isMarket={true}/>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Market;
