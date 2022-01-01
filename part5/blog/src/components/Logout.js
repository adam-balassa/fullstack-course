import React from 'react'

const Logout = ({ user, onLogout }) => (
  <div>
    { user.name } is logged in
    <button onClick={onLogout}>
      Log out
    </button>
  </div>
)

export default Logout