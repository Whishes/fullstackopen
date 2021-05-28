import React from "react"
import { useDispatch } from "react-redux"
import { addLike, deleteBlog, addComment } from "../reducers/blogReducer"
import { errorMessage, successMessage } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"

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

  const blogStyle = {
    paddingTop: 5,
    paddingBttom: 5,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const addCommentForm = (event) => {
    //console.log(event)
    const comment = event.target.comment.value
    event.preventDefault()
    try {
      dispatch(addComment(comment, blog.id))
      history.push(`/blogs/${blog.id}`)
      dispatch(successMessage(`${comment} added!`))
      console.log(`Comment: ${comment}`)
    } catch (error) {
      dispatch(errorMessage("Comment could not be added"))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle}>
      <h1>
        <span className="title">{blog.title}</span> by
        <span className="author"> {blog.author}</span>
      </h1>
      <a href={blog.url} className="url">
        {blog.url}
      </a>
      <p className="likes">
        <span>Likes:</span> <span className="blogLikes">{blog.likes}</span>
        <button onClick={addLikeBlog} className="likeButton">
          Like
        </button>
      </p>
      <p className="username">Added by User: {blog.user.name}</p>
      <button id="deleteButton" onClick={handleRemove}>
        Delete
      </button>

      <h3>Comments</h3>
      <form onSubmit={(event) => addCommentForm(event)}>
        <input type="comment" name="comment"></input>
        <button type="submit">Add Comment</button>
      </form>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
