import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => !message ? '' :
  <div style={{ border: 'solid', padding: 10, borderWidth: 1 }}>
    { message }
  </div>

const ConnectedNotification = connect(({ notification: { message } }) => ({ message }))(Notification)
export default ConnectedNotification