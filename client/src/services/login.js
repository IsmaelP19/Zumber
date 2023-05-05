import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL + "/login"



const login = async credentials => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default { login }