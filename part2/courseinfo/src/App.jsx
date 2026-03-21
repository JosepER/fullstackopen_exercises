import React from 'react'
import courses from '../data/course'

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {
    props.parts.map((part) => {
      return(<Part key={part.id} part={part} />)
    })
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <b>Total of exercises {props.total}</b>

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )

}

const Courses = ({courses}) => {
  return(
    <div>
    {
      courses.map((course) => {
        return (<Course key={course.id} course={course} />)
      })
    }
    </div>
  )
}

const App = () => {
  
  return <Courses courses={courses} />
}

export default App