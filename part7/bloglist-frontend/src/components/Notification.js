import React from "react"

const Notification = ({ message }) => {
  //console.log(message)
  if (message === null) {
    return null
  }

  return <div className={message.state}>{message.text}</div>
}

export default Notification
