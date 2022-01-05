import { useDispatch } from 'react-redux'
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={
      e => { 
        e.preventDefault()
          dispatch(createAnecdote(e.target.content.value))
      }}>
      <div><input name="content"/></div>
      <button type="submit">create</button>
    </form>
  </div>
)}

export default AnecdoteForm