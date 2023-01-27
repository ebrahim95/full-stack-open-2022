import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'


const Anecdotes = ({anecdote, handleVote}) => {
    const message = `you voted '${anecdote.content}'`
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote, message)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(anecdote => {
        return anecdote.content.includes(filter)
    }))
    const sort_anecdotes = [...anecdotes]
    const dispatch = useDispatch()
    const voteOf = (anecdote, message) => {
        dispatch(updateAnecdote(anecdote))
        dispatch(updateNotification(message,5000))

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