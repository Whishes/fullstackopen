import React from 'react'

const Header = ({header}) => {
  return (
  <div>
    <h1>
      {header}
    </h1>
  </div>
  )
}

const Content = ({ contents }) => {
  return (
  <div>
      {contents.map((content) =>
        <Part key={content.id} content={content} />
      )}
  </div>
  )
}

const Part = ({ content }) => {
  return (
    <p>
      {content.name} {content.exercises}
    </p>
  )
}

const Total = ({total}) => {
  const totalEx = total.reduce((total, part) => total + part.exercises, 0)

  return (
  <div>
    <p>
      Number of exercises {totalEx}
    </p>
    </div>
  )
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header header={course.name} />

      <Content contents={course.parts} />

      <Total total={course.parts} />
    </div>
  )
}

export default Course

