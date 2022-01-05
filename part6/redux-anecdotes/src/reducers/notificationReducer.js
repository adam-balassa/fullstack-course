const reducer = (state = { }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message }
    case 'CLEAR_NOTIFICATION':
      if (action.message === state.message)
        return { }
      return state
    default: return state
  }
}

const setNotification = message => ({
  type: 'SET_NOTIFICATION',
  message 
})

const clearNotification = message => ({
  type: 'CLEAR_NOTIFICATION',
  message
})

export const notify = (message, timeOutInSeconds) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification(message))
    }, 1000 * timeOutInSeconds)
  }
}

export default reducer