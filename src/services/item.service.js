import axios from "axios";
import authHeader from "./auth-header";

const getPublicItems = () => {
  return axios.get(`${process.env.API_URL}/items`);
};

const getUserItems = (userId) => {
  return axios.get(`${process.env.API_URL}/items/user/${userId}`, {
    headers: authHeader(),
  });
};

const userService = {
  getPublicItems,
  getUserItems,
};

export default userService;
