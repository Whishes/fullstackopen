import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "ADD_VOTE": {
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data
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
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update(id)
    dispatch ({
      type: 'ADD_VOTE',
      data: updateAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
    type: "CREATE_ANECDOTE",
    data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  }
}

export default reducer