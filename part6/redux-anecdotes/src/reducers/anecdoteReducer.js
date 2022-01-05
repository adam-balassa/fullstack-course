import * as anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => 
        anecdote.id === action.id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
    case 'CREATE_ANECDOTE':
      return [ ...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    default: return state
  }
}

export const vote = anecdote => {
  return async dispatch => {
    await anecdotesService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: 'VOTE', id: anecdote.id })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const data = await anecdotesService.create(content)
    return dispatch({ type: 'CREATE_ANECDOTE', data })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll()
    dispatch(({ type: 'INIT_ANECDOTE', data }))
  }
}


export default reducer