import axios from 'axios'
const baseUrl = '/api/users'

axios.defaults.baseURL = 'http://localhost:3003'

const register = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { register }