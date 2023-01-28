import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'



const AnecdoteForm =  ({ createAnecdote, updateNotification }) => {
    const createAnecdoteOf = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        createAnecdote(content)
        updateNotification(`you created '${content}'`,5000)
    } 
    return (
        <form onSubmit={createAnecdoteOf}>
            <div><input name="anecdote"/></div>
            <button >create</button>
        </form>
    )
}



export default connect(null, { createAnecdote, updateNotification})(AnecdoteForm)