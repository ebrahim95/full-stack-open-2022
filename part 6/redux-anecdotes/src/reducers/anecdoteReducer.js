import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const changeVote = state.find(anecdote => anecdote.id === action.payload )
      const anecdoteToChange = {
        ...changeVote, 
        votes: changeVote.votes + 1 }
        state = state.map(anecdote => anecdote.id === anecdoteToChange.id ? anecdoteToChange : anecdote)
      return state
    },
    setAnecdotes (state,action) {
      return action.payload
    }
  }

})


  // first create action type, then add the logic to increase the vote, modify state
export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer