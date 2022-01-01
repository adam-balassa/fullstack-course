import React, { useState } from 'react'

const Login = ({ onLogin }) => {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  
  return (<>
    <h2>Log in</h2>
    <form onSubmit={e => {e.preventDefault(); onLogin(userName, password);}}>
      <div>
        <label>Username</label>
        <input value={userName} name="userName" onChange={event => setUserName(event.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
      </div>
      <button type="submit">Log in</button>
    </form>
  </>
)}

export default Login