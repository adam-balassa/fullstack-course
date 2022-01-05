import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => axios.get(baseUrl).then(response => response.data)

export const create = async content => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

export const update = async anecdote => axios.put(`${baseUrl}/${anecdote.id}`, anecdote)