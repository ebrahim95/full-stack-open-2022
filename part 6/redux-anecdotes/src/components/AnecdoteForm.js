import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'



const AnecdoteForm =  () => {
    const dispatch = useDispatch()
    const createAnecdoteOf = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(updateNotification(`you created '${content}'`,5000))
    } 
    return (
        <form onSubmit={createAnecdoteOf}>
            <div><input name="anecdote"/></div>
            <button >create</button>
        </form>
    )
}

export default AnecdoteForm