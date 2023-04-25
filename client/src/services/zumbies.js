import axios from "axios";
const baseURL = "api/zumbies";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

export default { getAll };