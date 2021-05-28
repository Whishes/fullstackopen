import React from "react"
import { Container, List, ListItem, Typography } from "@material-ui/core"

const User = ({ userBlogs }) => {
  if (!userBlogs[0]) {
    return <h1>Not returning anything</h1>
  }

  return (
    <Container>
      <Typography variant="h4">{userBlogs[0].user.name}</Typography>
      <Typography variant="h6">Added Blogs:</Typography>
      <List>
        {userBlogs.map((userBlog) => (
          <ListItem key={userBlog.id}>{userBlog.title}</ListItem>
        ))}
      </List>
    </Container>
  )
}

export default User
