import ConstantList from "../../appConfig.js";
import axios from "axios";

const API_PATH_USER = "/user";

export const getUserById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_USER + '/' + id;
  return axios.get(url, ConstantList.CONFIG);
};

export const updateUserById = (user) => {
  console.log(user);
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_USER + '/' + user.id, { user: user }, ConstantList.CONFIG);
};

