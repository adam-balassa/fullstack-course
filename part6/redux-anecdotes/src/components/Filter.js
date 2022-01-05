import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {
  const { text } = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  return (
    <div>
      <span>filter</span>
      <input value={text} onChange={e => dispatch(setFilter(e.target.value))} />
    </div>)
}

export default Filter