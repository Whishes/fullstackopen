import { Container, Typography } from "@material-ui/core"
import React from "react"

const Notification = ({ message }) => {
  //console.log(message)
  if (message === null) {
    return null
  }

  return (
    <Container>
      <Typography className={message.state}>{message.text}</Typography>
    </Container>
  )
}

export default Notification
