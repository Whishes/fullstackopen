import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logUser } from "../reducers/userReducer"
import { errorMessage, successMessage } from "../reducers/notificationReducer"

const NavBar = () => {
  const padding = {
    padding: 5,
  }

  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user)

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem("loggedBlogappUser")
      dispatch(logUser(null))
      dispatch(successMessage("Successfully logged out"))
    } catch (error) {
      dispatch(errorMessage("User already logged out"))
    }
  }

  return (
    <div>
      {loggedInUser ? (
        <>
          <Link style={padding} to="/users">
            Users
          </Link>
          <Link style={padding} to="/">
            Blogs
          </Link>

          <span>{loggedInUser.name} is logged in! </span>
          <button type="submit" onClick={handleLogOut}>
            Log Out
          </button>
        </>
      ) : null}
    </div>
  )
}

export default NavBar
