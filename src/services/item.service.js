import axios from "axios";
import authHeader from "./auth-header";

const getPublicItems = () => {
  return axios.get(`${process.env.API_URL}/items`);
};

const getPublishedItems = () => {
  return axios
    .get(`${process.env.API_URL}/items/published`, {
      headers: authHeader(),
    });
};

const getUserItems = (userId) => {
  return axios.get(`${process.env.API_URL}/items/user/${userId}`, {
    headers: authHeader(),
  });
};

export { getPublicItems, getPublishedItems, getUserItems };
