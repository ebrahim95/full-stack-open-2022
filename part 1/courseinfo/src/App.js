import './App.css';

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  const { name, exercises } = part
  return (
    <p> {name} {exercises} </p>
  )
}

const Content = ({ part }) => {
  return (
    <div>
      <Part part={part[0]} />
      <Part part={part[1]} />
      <Part part={part[2]} />
    </div>
  )
}

const Total = ({ part }) => {
  return (
    <p>Number of exercises {part[0].exercises + part[1].exercises + part[2].exercises} </p>
  )
}


const App = () => {
  const course = "Half Stack application development"
  const part = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header course={course} />
      <Content part={part} />
      <Total part={part} />
    </div>
  )
}

export default App;
