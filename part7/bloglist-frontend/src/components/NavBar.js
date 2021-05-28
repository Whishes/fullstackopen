import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { logUser } from "../reducers/userReducer"
import { errorMessage, successMessage } from "../reducers/notificationReducer"
import {
  AppBar,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolBar: {
    flexWrap: "wrap",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector((state) => state.user)

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedBlogappUser")
      dispatch(logUser(null))
      dispatch(successMessage("Successfully logged out"))
      history.push("/")
    } catch (error) {
      dispatch(errorMessage("User already logged out"))
    }
  }

  return (
    <>
      {loggedInUser ? (
        <>
          <CssBaseline />
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolBar}>
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                {loggedInUser.name} is logged in!
              </Typography>

              <nav>
                <Button
                  color="textPrimary"
                  className={classes.link}
                  component={Link}
                  to="/users"
                >
                  Users
                </Button>
                <Button
                  color="textPrimary"
                  className={classes.link}
                  component={Link}
                  to="/"
                >
                  Blogs
                </Button>
              </nav>
              <Button
                color="primary"
                variant="outlined"
                className={classes.link}
                type="submit"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </Toolbar>
          </AppBar>
        </>
      ) : null}
    </>
  )
}

export default NavBar
