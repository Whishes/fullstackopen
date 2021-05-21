import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id, content) => {
        //console.log('vote', id)
      props.addVote(id)
      props.newNotification(`You voted for ${content}`, 5)
    }

    return (
        <div>
        {props.anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}

        </div>
    )
}

const mapDispatchToProps = {
  addVote,
  newNotification
}

const mapStateToProps = (state) => {
  const filter = state.filter
  const anecdotes = state.anecdotes

  if (filter === "") {
    return {
      anecdotes
    }
  }
  return {
    anecdotes: anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }

}

const ConnectAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectAnecdotes
