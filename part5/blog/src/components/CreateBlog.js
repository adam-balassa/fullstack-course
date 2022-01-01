import React, { useState } from 'react'

const CreateBlog = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form onSubmit={ e => { e.preventDefault(); onCreateBlog({title, author, url}); } }>
      <h2>Create blog</h2>
      <div>
        <label>Title</label>
        <input value={title} name="title" onChange={event => setTitle(event.target.value)}/>
      </div>
      <div>
        <label>Author</label>
        <input value={author} name="author" onChange={event => setAuthor(event.target.value)}/>
      </div>
      <div>
        <label>Url</label>
        <input value={url} name="url" onChange={event => setUrl(event.target.value)}/>
      </div>
      <input type="submit" value="Create!"/>
    </form>
  )
}

export default CreateBlog