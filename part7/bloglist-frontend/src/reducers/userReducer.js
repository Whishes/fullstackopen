const reducer = (state = [], action) => {
  switch (action.type) {
  case "LOG_USER": {
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

export default reducer
