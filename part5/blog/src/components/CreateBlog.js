import React, { useState } from 'react'

const CreateBlog = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form onSubmit={ e => { e.preventDefault(); onCreateBlog({ title, author, url }) } }>
      <h2>Create blog</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input value={title} id ="title" onChange={event => setTitle(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input value={author} id="author" onChange={event => setAuthor(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input value={url} id="url" onChange={event => setUrl(event.target.value)}/>
      </div>
      <input type="submit" value="Create!"/>
    </form>
  )
}

export default CreateBlog