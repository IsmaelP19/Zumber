import axios from "axios";
const baseURL = '/api/users';
// replace the baseUrl in the future for process.env.REACT_APP_BASE_URL + '/users'
let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getUser = (id) => {
    const request = axios.get(`${baseURL}/${id}`);
    return request.then((response) => response.data);
};

const getUserByUsername = async (username) => {
    const request = await axios.get(`${baseURL}/username/${username}`);
    return request.data;
};

const getUserZumbies = async (username) => {
    const request = await axios.get(`${baseURL}/${username}/zumbies`);
    return request.data;
};

const update = async (id, updatedUser) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(`${baseURL}/${id}`, updatedUser, config);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUser, getUserByUsername, getUserZumbies, update, setToken };
