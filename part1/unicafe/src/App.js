import React, { useState } from 'react'

const Button = ({text, onClick}) =>
  <button onClick={onClick}>{text}</button>

const Feedback = ({onGood, onNeutral, onBad}) => 
  <div>
    <h2>Give feedback</h2>
    <Button text="good" onClick={onGood}/>
    <Button text="neutral" onClick={onNeutral}/>
    <Button text="bad" onClick={onBad}/>
  </div>

const StatisticsLine = ({text, value}) => 
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0)
    return <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
  const score = good - bad
  return <div>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="all" value={all}/>
        <StatisticsLine text="average" value={score / all}/>
        <StatisticsLine text="positive" value={good / all * 100 + '%'}/>
      </tbody>
    </table>
  </div>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        onGood={() => setGood(good + 1)}  
        onNeutral={() => setNeutral(neutral + 1)}  
        onBad={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App