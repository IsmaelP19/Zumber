import axios from 'axios'
// const baseURL = process.env.REACT_APP_BASE_URL + '/user'
const baseURL = 'http://localhost:3003/api/users'



const register = async newObject => {
  const response = await axios.post(baseURL, newObject)
  return response.data
}

export default { register }