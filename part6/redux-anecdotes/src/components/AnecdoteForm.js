import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
      props.createAnecdote(content)
      props.newNotification(`Added ${content}`, 5)
    }
    
    return (
        <>
        <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
            </form>
            </>
    )
}

const mapDispatchToProps = {
  newNotification,
  createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)