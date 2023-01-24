import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'


const Anecdotes = ({anecdote, handleVote}) => {
    const message = `you voted '${anecdote.content}'`
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, message)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const sort_anecdotes = [...anecdotes]
    const dispatch = useDispatch()
    const voteOf = (id, message) => {
        dispatch(vote(id))
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
    
    return (
        <div>
            {
                sort_anecdotes.sort((a,b) =>  b.votes - a.votes).map(anecdote => <Anecdotes key={anecdote.id} anecdote={anecdote} handleVote={voteOf} />)
            }
        </div>

    )
}

export default AnecdoteList