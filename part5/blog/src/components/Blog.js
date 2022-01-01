import React, { useState } from 'react'

const Blog = ({blog, user, onLike, onDelete}) => {
  const [collapsed, setCollapsed] = useState(true)

  const deleteBlog = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${blog.title}?`)
    if (confirmed)
      onDelete(blog)
  }

  const collapsedBlog = () => <div>
    {blog.title} {blog.author}
    <button onClick={() => setCollapsed(false)}>View</button>
  </div>  

  const openBlog = () => <div style={{ border: '1px solid black' }}>
    <p>
      {blog.title} {blog.author} 
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

export default Blog