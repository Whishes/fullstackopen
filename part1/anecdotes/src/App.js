import React, { useState } from 'react'

const Button = (props) => {
    const {handleClick, text} = props

    return (
    <button onClick={handleClick}>
      {text}
    </button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    
    const randomAnecdote = () => {
        const getRandomNumber = Math.floor(Math.random() * anecdotes.length)
        setSelected(getRandomNumber)
    }

    const addVote = () => {
        // Copy array 
        const newVotes = [...votes]
        // increment value in the nth(selected) position of array 
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    let mostVotes = votes.indexOf(Math.max(...votes))
    //console.log(anecdotes[mostVotes])

    return (
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <p> This anecdote has {votes[selected]} votes </p>
        <div> 
            <Button handleClick={randomAnecdote} text="next anecdote" />
            <Button handleClick={addVote} text="vote" />
        </div>
          
        <h1>Anecdote of the day</h1>
        {anecdotes[mostVotes]}
    </div>
  )
}

export default App