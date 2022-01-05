const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = ({ good, ok, bad } = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { good: good + 1, ok, bad }
    case 'OK':
      return { good, ok: ok + 1, bad }
    case 'BAD':
      return { good, ok, bad: bad + 1 }
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default: return { good, ok, bad }
  }
  
}

export default counterReducer