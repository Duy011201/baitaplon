import ConstantList from "../../appConfig.js";
import axios from "axios";

const API_PATH_STUDENT = "/student";

export const getAllStudent = () => {
  let url = ConstantList.API_ENDPOINT + API_PATH_STUDENT + "/all";
  return axios.get(url, ConstantList.CONFIG);
};

export const getStudentById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_STUDENT + '/' + id;
  return axios.get(url, ConstantList.CONFIG);
};

export const createStudent = (student) => {
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_STUDENT, { student: student }, ConstantList.CONFIG);
};

export const updateStudentById = (student) => {
  return axios.post(ConstantList.API_ENDPOINT + API_PATH_STUDENT + '/' + student.id, { student: student }, ConstantList.CONFIG);
};

export const deleteStudentById = (id) => {
  let url = ConstantList.API_ENDPOINT + API_PATH_STUDENT + '/' + id;
  return axios.delete(url, ConstantList.CONFIG);
};
