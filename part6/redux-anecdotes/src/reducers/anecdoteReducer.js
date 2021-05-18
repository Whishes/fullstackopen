const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "ADD_VOTE": {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case "CREATE_ANECDOTE":
      return [...state, action.data]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: "CREATE_ANECDOTE",
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  }
}

export default reducer