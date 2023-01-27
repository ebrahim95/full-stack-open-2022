import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const anecdoteToChange = action.payload
        state = state.map(anecdote => anecdote.id === anecdoteToChange.id ? anecdoteToChange : anecdote)
      return state
    },
    setAnecdotes (state,action) {
      return action.payload
    }
  }

})


  // first create action type, then add the logic to increase the vote, modify state
export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const returned_anecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(returned_anecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteToChange = {
      ...anecdote, 
      votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.updateVote(anecdoteToChange.id, anecdoteToChange)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer