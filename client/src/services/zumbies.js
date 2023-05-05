import axios from "axios";
// const baseURL = process.env.REACT_APP_BASE_URL + "/zumbies";
const baseURL = "http://localhost:3003/api/zumbies";

const getAll = () => {
  const request = axios.get(baseURL);
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

export default { getAll, update, create };