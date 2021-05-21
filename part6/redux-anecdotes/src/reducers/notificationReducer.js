const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":
            clearTimeout(state.time)
            return action.message
        case "END_NOTIFICATION":
            return ""
        default:
            return state
    }
}

export const newNotification = (message, time) => {
    const returnedTime = time * 1000

    return async dispatch => {
        dispatch({
            type: "NEW_NOTIFICATION",
            message,
        })
        setTimeout(() => {
            dispatch({
                type: "END_NOTIFICATION"
            })
        }, returnedTime)
    }
}


export default notificationReducer