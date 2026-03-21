import { useState } from 'react'

const Button = (props) => {
  
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let average = Math.round((good - bad))
  let positive = Math.round((good/(good+neutral+bad))*100) + " %"


  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            {[
              { text: 'good', value: good },
              { text: 'neutral', value: neutral },
              { text: 'bad', value: bad },
              { text: 'average', value: average },
              { text: 'positive', value: positive },
            ].map((stat) => (
              <StatisticLine key={stat.text} text={stat.text} value={stat.value} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
