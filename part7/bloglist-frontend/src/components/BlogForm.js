import React, { useState } from "react"
import { CssBaseline, TextField, Button, makeStyles } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "50%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const BlogForm = ({ addBlogForm }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const classes = useStyles()
  const history = useHistory()

  const addBlog = (event) => {
    event.preventDefault()
    addBlogForm({
      title,
      author,
      url,
    })
    // console.log(blogObject)
    setTitle("")
    setAuthor("")
    setUrl("")
    history.push("/")
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={addBlog}>
          <TextField
            className="title"
            type="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            variant="standard"
            fullWidth
            label="Title"
            required
          />
          <TextField
            className="author"
            type="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            label="Author"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            name="Url"
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            variant="standard"
            fullWidth
            label="Url"
            required
          />
          <Button
            className={classes.submit}
            type="submit"
            color="primary"
            variant="outlined"
          >
            Submit Blog
          </Button>
        </form>
      </div>
    </>
  )
}

export default BlogForm
