import React from "react"
import { useDispatch } from "react-redux"
import { addLike } from "../reducers/blogReducer"
import { errorMessage, successMessage } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"

const Blog = ({ blog, removeBlog }) => {
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
        dispatch(removeBlog(blog))
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
    </div>
  )
}

export default Blog
