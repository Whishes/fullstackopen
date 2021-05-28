import userService from "../services/users"

const reducer = (state = [], action) => {
  switch (action.type) {
  case "LOG_USER": {
    return action.data
  }
  case "GET_USERS": {
    return action.data
  }

  default:
    return state
  }
}

export const logUser = (user) => {
  return {
    type: "LOG_USER",
    data: user,
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: "GET_USERS",
      data: users,
    })
  }
}

export default reducer