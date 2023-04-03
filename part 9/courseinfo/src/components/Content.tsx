import { CoursePart } from "../types";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union memeber: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: { part: CoursePart }) => {


  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>)
    case "group":
      return (<div>
        project exercises {part.groupProjectCount}
      </div>
      )
    case "background":
      return (<div>
        <i>{part.description}</i>
        <br />{part.backgroundMaterial}
      </div>)
    case "special":
      return (
        <div>
          <i>{part.description}</i>
          <br /> required skills: {part.requirements}
        </div>
      )
    default:
      return assertNever(part);
  }
}
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => {
        return (
          <div style={{ marginBottom: 20 }} key={part.name}>
            <b >{part.name} {part.exerciseCount}</b>
            <Part part={part} />
          </div>
        )
      })}
    </div >
  )
}

export default Content
