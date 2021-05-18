const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":
            return action.message
        case "END_NOTIFICATION":
            return ""
        default:
            return state
    }
}

export const newNotification = message => {
    return {
        type: "NEW_NOTIFICATION",
        message,
    }
}

export const endNotification = () => {
    return {
        type: "END_NOTIFICATION"
    }
}

export default notificationReducer