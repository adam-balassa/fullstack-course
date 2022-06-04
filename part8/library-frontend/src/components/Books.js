import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import FilterBooks from './FilterBooks'

const Books = (props) => {
  const [ filter, setFilter ] = useState(null)
  const [ findBooks, result ] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    findBooks()
  }, [ ])

  if (!props.show)
    return null

  if (!result || result.loading)
    return <div>loading...</div>

  const books = result.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => !filter || book.genres.includes(filter)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <FilterBooks setFilter={setFilter}/>
    </div>
  )
}

export default Books