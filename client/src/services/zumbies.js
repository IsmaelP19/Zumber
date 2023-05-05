import axios from "axios";
// const baseURL = process.env.REACT_APP_BASE_URL + "/zumbies";
const baseURL = "http://localhost:3003/http://localhost:3003/api/zumbies";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

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

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
};
  const response = await axios.delete(`${baseURL}/${id}`, config);
  return response.data;
};

export default { setToken, getAll, getZumby, update, create, remove };