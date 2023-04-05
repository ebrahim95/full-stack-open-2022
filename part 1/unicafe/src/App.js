import './App.css';
import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  const average = (good - bad) / total
  const postive = ((good / total) * 100).toFixed(1) + ' %'
  return (
    <>
      <h2>Statistics</h2>
      {total !== 0 ?
        <div>
          <table>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Postive" value={postive} />
          </table>
        </div> : "No feedback given"}
    </>)
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div style={{ padding: 5 }}>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 100, }}>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
