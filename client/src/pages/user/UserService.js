import ConstantList from "../../appConfig.js";
import axios from "axios";

const API_PATH_USER = "/user";
const API_PATH_AUTH = "/auth";

export const getAllUser = () => {
  let url = ConstantList.API_ENDPOINT + API_PATH_USER + "/all";
  return axios.get(url, ConstantList.CONFIG);
};

export const getUserById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_USER + '/' + id;
  return axios.get(url, ConstantList.CONFIG);
};

export const createUser = (user) => {
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_AUTH + '/register', { user: user }, ConstantList.CONFIG);
};

export const updateUserById = (user) => {
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_USER + '/' + user.id, { user: user }, ConstantList.CONFIG);
};

export const deleteUserById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_USER + '/' + id;
  return axios.delete(url, ConstantList.CONFIG);
};
