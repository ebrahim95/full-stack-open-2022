import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data 
}

const createNew = async (content) => {
    const obj = {
        content, 
        votes: 0
    }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const updateVote = async (id, anecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVote }