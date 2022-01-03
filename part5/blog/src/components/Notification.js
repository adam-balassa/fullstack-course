import React from 'react'

const Notification = ({ notification: { message, error=false } }) => {
  if (!message)
    return <></>
  return <div style={{
    backgroundColor: error ? 'red' : 'green',
    color: 'white',
    padding: '1rem',
    boxShadow: '#2227 2px 2px 5px',
    margin: '1rem',
    borderRadius: '5px',
    textAlign: 'center'
  }}>
    <span>{message}</span>
  </div>
}

export default Notification
