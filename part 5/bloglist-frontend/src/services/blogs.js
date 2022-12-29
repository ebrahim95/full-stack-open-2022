import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const config = {
  headers: { Authorization: token }
}

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}

const getAll =  async () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, editedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, editedObject)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }