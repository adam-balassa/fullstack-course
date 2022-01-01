import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blogId, likes) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.patch(`${baseUrl}/${blogId}`, { likes }, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, createBlog, likeBlog, deleteBlog, setToken }