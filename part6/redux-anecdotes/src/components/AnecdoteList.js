import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    let finalAnecdotes = anecdotes
    if (filter)
      finalAnecdotes = finalAnecdotes.filter(anecdote => anecdote.content.includes(filter))
    return finalAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote))
              dispatch(notify(`You voted for "${anecdote.content}"`, 2))
            }}>vote</button>
          </div>
        </div>
    )}
    </div>)
}

export default AnecdoteList