import axios from 'axios'
const baseUrl = '/api/auth'

const login = async ({ userName, password }) => {
  const response = await axios.post(`${baseUrl}/login`, { userName, password })
  return response.data
}

export default { login }