import './App.css';

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length - 1).fill(0))

  const clickRandom = () => {
    const random = Math.floor(Math.random() * (anecdotes.length));

    setSelected(random)
  }

  const clickVote = () => {
    const duplicate = [...vote]
    duplicate[selected] += 1
    setVote([...duplicate])
  }
  return (
    <div style={{ padding: 5 }}>
      <h1> Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Votes {vote[selected]}</p>
      <button onClick={clickVote}> Vote </button>
      <button onClick={clickRandom}> Random Anecdote </button>
      <h1> Anecdote with most votes </h1>
      {anecdotes[vote.indexOf(Math.max(...vote))]} <br />
      has {Math.max(...vote)} votes
    </div>
  )
}

export default App
