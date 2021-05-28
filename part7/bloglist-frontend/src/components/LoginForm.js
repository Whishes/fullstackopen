import React, { useState } from "react"
import { useDispatch } from "react-redux"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { successMessage, errorMessage } from "../reducers/notificationReducer"
import { logUser } from "../reducers/userReducer"
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
  CssBaseline,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const classes = useStyles()

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            label="Username"
            type="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Button
            id="loginButton"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            login
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
