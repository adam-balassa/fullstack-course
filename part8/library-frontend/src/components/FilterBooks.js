import React, { useEffect } from 'react'

const FilterBooks = ({ books, setFilter }) => {
  const genres = ['refactoring', 'agile', 'patterns', 'design']

  return <div>
    { genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>) }
    <button onClick={() => setFilter(null)}>All genres</button>
  </div>

}

export default FilterBooks