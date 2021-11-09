import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const update = person => {
  return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

const deletePerson = person => {
  return axios.delete(`${baseUrl}/${person.id}`).then(response => response.data)
}


const service = { getAll, create, deletePerson, update } 
export default service