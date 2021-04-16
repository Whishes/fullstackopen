import React, { useState } from 'react'

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  const { text, amount } = props

  return (
    <tr>
      <td>{text}: {amount}</td>
    </tr>
  )
}

const Statistics = (props) => {
  //console.log(props)
  const { clicks: { good, neutral, bad } } = props
  const all = good + neutral + bad

  // Average calc
  let average = 0
  if (all > 0) {
    average = (good - bad) / all
  }
  // Percentage calc
  let percentage = "0%"
  if (good > 0) {
    percentage = (good / all) * 100 + "%"
  }
  // Display no stats if all values are at 0
  if (all === 0) {
    return (
      <div>
        No feedback given yet
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" amount={good} />
          <Statistic text="Neutral" amount={neutral} />
          <Statistic text="Bad" amount={bad} />
          <Statistic text="All" amount={all} />
          <Statistic text="Average" amount={average} />
          <Statistic text="Percentage of postive feedback" amount={percentage} />
        </tbody>  
      </table>  
    </div>  
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    //console.log("Good clicks:", good)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    //console.log("Neutral clicks:", neutral)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    //console.log("Bad clicks:", bad)
  }
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      
      <h1>Statistics</h1>
      <Statistics clicks={{ good, neutral, bad }}/>

    </div>
  )
}

export default App