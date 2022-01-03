import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [collapsed, setCollapsed] = useState(true)

  const deleteBlog = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${blog.title}?`)
    if (confirmed)
      onDelete(blog)
  }

  const collapsedBlog = () => <div>
    <span>{blog.title}</span>
    <span>{blog.author}</span>
    <button onClick={() => setCollapsed(false)}>View</button>
  </div>

  const openBlog = () => <div style={{ border: '1px solid black' }}>
    <p>
      <span>{blog.title}</span>
      <span>{blog.author}</span>
      <button onClick={() => setCollapsed(true)}>Hide</button>
    </p>
    <p>{blog.url}</p>
    <p>{
      blog.likes} likes
    <button onClick={() => onLike(blog)}>Like</button>
    </p>
    { blog.user.userName === user.userName ? (<button onClick={deleteBlog}>Delete</button>) : ''}
  </div>

  return collapsed ? collapsedBlog() : openBlog()
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      userName: PropTypes.string.isRequired
    })
  }),
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    name: PropTypes.string
  }),
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog