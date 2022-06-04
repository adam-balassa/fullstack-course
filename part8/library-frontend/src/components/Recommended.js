import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({ show }) => {
  const [ genre, setGenre ] = useState(null)
  const [ findBooks, books ] = useLazyQuery(ALL_BOOKS)
  const [ getUser, user ] = useLazyQuery(ME)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (genre)
      findBooks({ variables: { genre }})
  }, [ genre, show ])

  useEffect(() => {
    if (user.data) {
      const { favoriteGenre } = user.data.me
      setGenre(favoriteGenre)
    }
  }, [ user.data ])

  if (!show) return null
  if (user.loading || books.loading || !books.data) return <h2>Loading...</h2>

  return <div>
    <h2>Recommended</h2>
    <div>Recommended books for you in genre <strong>{genre}</strong></div>
    <table>
        <tbody>
          <tr>
            <th></th><th>author</th><th>published</th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
  </div>
}

export default Recommended