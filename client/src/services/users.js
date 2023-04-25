import axios from "axios";
const baseURL = "api/users";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getUser = (id) => {
    const request = axios.get(`${baseURL}/${id}`);
    return request.then((response) => response.data);
};

const getUserByUsername = (username) => {
    const request = axios.get(`${baseURL}/username/${username}`);
    return request.then((response) => response.data);
};

const update = async (id, updatedUser) => {
    const config = {
        headers: { Authorization: token },
    };
    console.log("updatedUser", updatedUser);
    console.log("config", config);
    console.log("id", id);
    const response = await axios.put(`${baseURL}/${id}`, updatedUser);//, config);
    return response.data;
};

export default { getUser, getUserByUsername, update, setToken };
