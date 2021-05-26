const notificationReducer = (state = "", action) => {
  switch (action.type) {
  case "NEW_NOTIFICATION":
    return action.data
  case "END_NOTIFICATION":
    return null
  default:
    return state
  }
}

export default notificationReducer

export const successMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: {
        text: message,
        state: "successful",
      },
    })
    setTimeout(() => {
      dispatch({
        type: "END_NOTIFICATION",
      })
    }, 5000)
  }
}
export const errorMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: {
        text: message,
        state: "unsuccessful",
      },
    })
    setTimeout(() => {
      dispatch({
        type: "END_NOTIFICATION",
      })
    }, 5000)
  }
}
