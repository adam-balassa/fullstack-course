import React, { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      { visible ? (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      ) : (<>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </>)
      }
    </div>
  )
}

export default Togglable