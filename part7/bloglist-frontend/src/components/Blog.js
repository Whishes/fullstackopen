import React from "react"
import { useDispatch } from "react-redux"
import { addLike, deleteBlog, addComment } from "../reducers/blogReducer"
import { errorMessage, successMessage } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  TextField,
  List,
  ListItem,
  Container,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const addLikeBlog = () => {
    try {
      dispatch(addLike(blog))
      history.push(`/blogs/${blog.id}`)
    } catch (error) {
      dispatch(errorMessage("Failed to add like to blog"))
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(successMessage("Blog has been deleted"))
        history.push("/")
      } catch (error) {
        dispatch(errorMessage("Blog could not be deleted"))
      }
    }
  }

  const addCommentForm = (event) => {
    //console.log(event)
    const comment = event.target.comment.value
    event.preventDefault()
    try {
      dispatch(addComment(comment, blog.id))
      dispatch(successMessage(`${comment} added!`))
      history.push(`/blogs/${blog.id}`)
      //console.log(`Comment: ${comment}`)
    } catch (error) {
      dispatch(errorMessage("Comment could not be added"))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">
            {blog.title} by {blog.author}
          </Typography>
          <Link
            component="button"
            variant="body1"
            href={blog.url}
            className="url"
          >
            Blog Url
          </Link>
          <Typography className="likes">
            Likes: {blog.likes}
            <Button onClick={addLikeBlog} className="likeButton">
              Like
            </Button>
          </Typography>
          <Typography className="username" variant="body2" component="p">
            Added by User: {blog.user.name}
            <Button id="deleteButton" onClick={handleRemove}>
              Delete
            </Button>
          </Typography>
        </CardContent>
      </Card>
      <Container>
        <Typography variant="h6">Comments</Typography>
        <form onSubmit={(event) => addCommentForm(event)}>
          <TextField label="Comment" type="comment" name="comment"></TextField>
          <Button type="submit">Add Comment</Button>
        </form>

        <List variant="inherit">
          {blog.comments.map((comment) => (
            <ListItem key={comment}>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText>{comment}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  )
}

export default Blog
