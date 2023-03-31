import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/items`).then((res) => {
      console.log("items res HOME", res);
      setItems(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to the home page !</h1>
      <h2>Item list : </h2>
      {items.map((item) => (
        <div style={{padding:'45px'}} key={item.id}>
            Name : {item.name}
            <div>Estimation : {item.estimation}</div>
            <div>Description : {item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
