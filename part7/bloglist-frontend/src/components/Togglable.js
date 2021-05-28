import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  Togglable.displayName = "Toggleable"

  return (
    <>
      <div style={hideWhenVisible}>
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <IconButton aria-label="close form" onClick={toggleVisibility}>
          <CloseIcon />
        </IconButton>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
