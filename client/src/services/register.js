import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL + '/users'


const register = async newObject => {
  const response = await axios.post(baseURL, newObject)
  return response.data
}

export default { register }