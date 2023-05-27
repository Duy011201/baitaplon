import ConstantList from "../../appConfig.js";
import axios from "axios";

const API_PATH_AUTH = "/auth";
const API_PATH_USER = "/user";
const API_PATH_ROLE = "/role";

export const userLogin = (user) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_AUTH + "/login";
  return axios.post(url, user);
};

export const getAllRoles = () => {
  let url = ConstantList.API_ENDPOINT + API_PATH_ROLE + "/all";
  return axios.get(url);
};

export const getUserById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_USER + id;
  return axios.get(url);
};

export const saveUser = (user) => {
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_USER, user);
};
