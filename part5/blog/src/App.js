import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/user'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogsState] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const setBlogs = blogs => {
    setBlogsState(blogs.sort((a, b) => b.likes - a.likes))
  }

  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification({})
    }, error ? 2500 : 1500)
  }

  const withNotification = async (body, success) => {
    try {
      const res = await body()
      showNotification(success, false)
      return res
    } catch (e) {
      console.log(e.response)
      showNotification(e.response.data.error || e.message || 'An error occured', true)
      throw e
    }
  }

  const userLoggedIn = async user => {
    setUser(user)
    blogService.setToken(user.token)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const login = async (userName, password) => {
    try {
      const user = await withNotification(() => loginService.login({ userName, password }), 'Login successful')
      if (user && user.token) {
        userService.saveUser(user)
        userLoggedIn(user)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const logOut = async () => {
    await withNotification(() => userService.logOut(), 'Logout successful')
    setUser(null)
  }

  const createBlog = async blog => {
    const newBlog = await withNotification(() => blogService.createBlog(blog), `A new blog "${blog.title}" is successfully created`)
    setBlogs([...blogs, newBlog])
  }

  const likeBlog = async blog => {
    const newBlog = await withNotification(() => blogService.likeBlog(blog.id, blog.likes + 1), `You liked "${blog.title}"`)
    setBlogs(blogs.map(b => b.id === blog.id ? newBlog : b))
  }

  const deleteBlog = async blog => {
    await withNotification(() => blogService.deleteBlog(blog.id), `You deleted "${blog.title}"`)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  useEffect(() => {
    const loggedInUser = userService.getUser()
    loggedInUser && userLoggedIn(loggedInUser)
  }, [])

  return <>
    <Notification notification={notification}/>
    { user ? (
      <div>
        <h1>Blogs</h1>
        <Logout user={user} onLogout={logOut}/>
        <hr/>
        <Togglable buttonLabel="Create a blog">
          <CreateBlog onCreateBlog={createBlog}/>
        </Togglable>
        <hr/>
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} onLike={likeBlog} onDelete={deleteBlog}/>
          )}
        </div>
      </div>
    ) : <Login onLogin={login} />}
  </>
}

export default App