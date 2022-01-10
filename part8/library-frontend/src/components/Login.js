import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('book-app-user-token', token)
    }
  }, [result.data])

  const onSubmit = () => {
    login({ variables: { userName, password } })
  }

  return <div>
    <h2>Login</h2>
    <form onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <div>
        <input placeholder='Username...' name='username' onChange={e => setUserName(e.target.value)} />
      </div>
      <div>
        <input placeholder='Password...' name='password' onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  </div>
}

export default Login