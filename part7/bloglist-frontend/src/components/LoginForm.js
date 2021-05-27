import React, { useState } from "react"
import { useDispatch } from "react-redux"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { successMessage, errorMessage } from "../reducers/notificationReducer"
import { logUser } from "../reducers/userReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(logUser(user))
      setUsername("")
      setPassword("")
      dispatch(successMessage(`${user.name} logged in successfully`))
    } catch (exception) {
      dispatch(errorMessage(exception.response.data.error))
    }
  }

  return (
    <div>
      <h2>Log in to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
