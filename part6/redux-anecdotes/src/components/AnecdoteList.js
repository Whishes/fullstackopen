import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { endNotification, newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())

  const dispatch = useDispatch()

    const vote = (id, content) => {
        //console.log('vote', id)
      dispatch(addVote(id))
      dispatch(newNotification(`You voted for ${content}`))
      setTimeout(() => {
        dispatch(endNotification())
      }, 5000)
    }


    return (
        <div>
        {anecdotes
          .filter(anecdote => anecdote.content.includes(filter))
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

export default AnecdoteList
