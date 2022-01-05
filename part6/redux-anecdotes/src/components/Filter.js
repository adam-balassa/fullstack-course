import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = ({ text, setFilter }) => 
  <div>
    <span>filter</span>
    <input value={text} onChange={e => setFilter(e.target.value)} />
  </div>

const ConnectedFilter = connect(
  ({ filter: { text } }) => ({ text }),
  { setFilter }
)(Filter)

export default ConnectedFilter