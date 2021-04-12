import React from 'react'

const Header = (props) => {
  return (
  <div>
    <h1>
      {props.header}
    </h1>
  </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content.part} {props.content.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
  <div>
      <Part content={props.content[0]}/>
      <Part content={props.content[1]}/>
      <Part content={props.content[2]}/>
  </div>
  )
}

const Total = (props) => {
  return (
  <div>
    <p>
      Number of exercises {props.total}
    </p>
    </div>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      part: "Fundamentals of React",
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header header={course} />

      <Content content={parts}/>

      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App;
