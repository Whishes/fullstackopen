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
      {props.content.name} {props.content.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
  <div>
      <Part content={props.content[0]}/>
      <Part content={props.content[1]}/>
      <Part content={props.content[2]}/>
  </div>
  )
}

const Total = (props) => {
  const totalEx = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises

  return (
  <div>
    <p>
      Number of exercises {totalEx}
    </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course.name} />

      <Content content={course.parts}/>

      <Total total={course.parts} />
    </div>
  )
}

export default App;
