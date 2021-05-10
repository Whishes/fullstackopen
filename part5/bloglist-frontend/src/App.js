import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Add Blog vars
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Local Storage effect hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

   const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ message: `${user.name} logged in successfully`, state: "successful" })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ message: exception.response.data.error, state: "unsuccessful" })
      //console.log(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedBlogappUser")
      setUser(null)
    } catch (error) {
      setMessage("User already logged out")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      //console.log(blogObject)

      blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          })
      
      setTitle("")  
      setAuthor("")  
      setUrl("")
      setMessage(
                {message: `A new blog "${blogObject.title}" by ${blogObject.author} added`, state: "successful"}
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)  
    } catch (error) {
      setMessage({message: "Failed to add a new blog", state: "unsuccessful"})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } 
  }

  if (user === null) {
    return (
      <div>
        <LoginForm message={message} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in</p>

      <button type="submit" onClick={handleLogOut}>Log Out</button>

     <BlogForm addBlog={addBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}></BlogForm>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App