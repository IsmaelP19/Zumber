import axios from "axios";
const baseURL = "api/zumbies";

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