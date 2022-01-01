import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/user'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const showNotification = (message, error) => {
    setNotification({message, error})
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
      showNotification(e.response.data.error || e.message || 'An error occured', true)
    }
  }

  const userLoggedIn = async user => {
    setUser(user)
    blogService.setToken(user.token)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const login = async (userName, password) => {
    const user = await withNotification(() => loginService.login({ userName, password }), 'Login successful')
    if (user && user.token) {
      userService.saveUser(user);
      userLoggedIn(user);
    }
  }

  const logOut = async () => {
    await withNotification(() => userService.logOut(), 'Logout successful')
    setUser(null);
  }

  const createBlog = async blog => {
    await withNotification(() => blogService.createBlog(blog), `A new blog "${blog.title}" is successfully created`)
    setBlogs([...blogs, blog])
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
        <CreateBlog onCreateBlog={createBlog}/>      
        <hr/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    ) : <Login onLogin={login} />}
  </>
}

export default App