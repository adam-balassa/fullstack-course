import { connect } from 'react-redux'
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ createAnecdote }) => 
  <div>
    <h2>create new</h2>
    <form onSubmit={
      e => { 
        e.preventDefault()
        createAnecdote(e.target.content.value)
      }}>
      <div><input name="content"/></div>
      <button type="submit">create</button>
    </form>
  </div>

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm