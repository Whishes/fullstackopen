import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"

import { useDispatch, useSelector } from "react-redux"
import { errorMessage, successMessage } from "./reducers/notificationReducer"
import { initializeBlogs, createBlog, deleteBlog } from "./reducers/blogReducer"
import { logUser } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.message)

  // init all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Local Storage effect hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      dispatch(logUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      dispatch(successMessage(`${user.name} logged in successfully`))
    } catch (exception) {
      dispatch(errorMessage(exception.response.data.error))
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedBlogappUser")
      setUser(null)
    } catch (error) {
      dispatch(errorMessage("User already logged out"))
    }
  }

  const addBlogForm = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(
        successMessage(
          `A new blog "${blogObject.title}" by ${blogObject.author} was added`
        )
      )
    } catch (error) {
      dispatch(errorMessage("Failed to add new blog"))
    }
  }

  const removeBlog = (blog) => {
    // console.log(blog);
    try {
      dispatch(deleteBlog(blog.id))

      dispatch(successMessage(`${blog.title} has been deleted`))
    } catch (error) {
      dispatch(errorMessage(`${blog.title} cannot be deleted`))
    }
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          message={message}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in</p>

      <button type="submit" onClick={handleLogOut}>
        Log Out
      </button>

      <h2>Create New Blog</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlogForm={addBlogForm} />
      </Togglable>

      <h2>Blog List</h2>
      {blogs.sort((a, b) => b.likes - a.likes) &&
        blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
        ))}
    </div>
  )
}

export default App
