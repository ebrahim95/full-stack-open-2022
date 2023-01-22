import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const Anecdotes = ({anecdote, handleVote}) => {
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const voteOf = (id) => {
        dispatch(vote(id))
    }
 
    return (
        <div>
            {
                anecdotes.sort((a, b) => {
                return b.votes - a.votes
               }).map(anecdote => <Anecdotes key={anecdote.id} anecdote={anecdote} handleVote={voteOf} />)
            }
        </div>

    )
}

export default AnecdoteList