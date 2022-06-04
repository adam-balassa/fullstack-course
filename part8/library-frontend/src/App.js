
import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const client = useApolloClient()
  const [ token, setToken ] = useState(null)
  const [page, setPage] = useState('authors')

  useEffect(() => {
    if (!token)
      setToken(localStorage.getItem('book-app-user-token') || null)
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      const data = client.readQuery({ query: ALL_BOOKS })
      if (!data.allBooks.find(({ id }) => id === book.id))
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: data.allBooks.concat(book) }
        })
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token)
    return <Login setToken={setToken}/>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended 
        show={page === 'recommended'}/>

    </div>
  )
}

export default App