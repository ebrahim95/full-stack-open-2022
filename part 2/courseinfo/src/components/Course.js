
const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Part = ({ part }) => {
  const { name, exercises } = part
  return (
    <p> {name} {exercises} </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <Part part={part} />
      })}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s += p.exercises, 0)
  return (
    <p> Total of {total} exercises</p>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}


export default Course
