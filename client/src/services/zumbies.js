import axios from "axios";
const baseURL = "http://localhost:3003/api/zumbies";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const getZumby = (id) => {
  const request = axios.get(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const update = async (id, updatedZumby) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedZumby);
  return response.data;
};

const create = async (newZumby) => {
  const response = await axios.post(baseURL, newZumby);
  return response.data;
};

export default { getAll, getZumby, update, create };