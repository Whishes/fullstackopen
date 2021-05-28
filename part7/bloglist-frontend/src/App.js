import React, { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import Users from "./components/Users"
import User from "./components/User"

import { useDispatch, useSelector } from "react-redux"
import { errorMessage, successMessage } from "./reducers/notificationReducer"
import { initializeBlogs, createBlog, deleteBlog } from "./reducers/blogReducer"
import { logUser } from "./reducers/userReducer"

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import NavBar from "./components/NavBar"
import { Container, List, ListItem, Typography } from "@material-ui/core"

const App = () => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.message)
  const loggedInUser = useSelector((state) => state.user)

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
      history.push("/")
    } catch (error) {
      dispatch(errorMessage(`${blog.title} cannot be deleted`))
    }
  }

  const match = useRouteMatch("/users/:id")
  const usersBlog = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null
  //console.log(usersBlog)

  const matchBlog = useRouteMatch("/blogs/:id")
  const selectedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <>
      <NavBar />

      <Notification message={message} />
      <Switch>
        <Route path="/users/:id">
          <User userBlogs={usersBlog} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={selectedBlog} removeBlog={removeBlog} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {loggedInUser === null ? (
            <div>
              <LoginForm />
            </div>
          ) : (
            <Container>
              <Typography variant="h5">Create New Blog</Typography>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm addBlogForm={addBlogForm} />
              </Togglable>

              <Typography variant="h5">Blog List</Typography>
              <List>
                {blogs.sort((a, b) => b.likes - a.likes) &&
                  blogs.map((blog) => (
                    //<Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
                    <ListItem
                      button
                      key={blog.id}
                      component={Link}
                      to={`/blogs/${blog.id}`}
                    >
                      {blog.title}
                    </ListItem>
                  ))}
              </List>
            </Container>
          )}
        </Route>
      </Switch>
    </>
  )
}

export default App
