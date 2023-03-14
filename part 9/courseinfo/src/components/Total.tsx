interface exerciseCount {
  count: number[]
}
const Total = (props: exerciseCount) => {
  return (
    <p>
      Number of exercises{" "}
      {props.count.reduce((i, count) => i + count, 0)}
    </p>
  )
}

export default Total
