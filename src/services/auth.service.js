import axios from "axios";

const register = (pseudo, email, password, passwordConfirm, lastname, firstname) => {
  return axios.post(`${process.env.API_URL}/auth/register`, {
    pseudo,
    email,
    password,
    passwordConfirm,
    lastname,
    firstname,
  });
};

const login = (email, password, passwordConfirm) => {
  return axios
    .post(`${process.env.API_URL}/auth/login`, {
        email,
      password,
      passwordConfirm,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;