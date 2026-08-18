import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="app">
      <h1>React Demo App By Suhas From main</h1>
      <p className="subtitle">A basic starter project to show React in action</p>

      <div className="card">
        <h2>Counter</h2>
        <p className="count">{count}</p>
        <div className="button-row">
          <button onClick={() => setCount((c) => c - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
        </div>
      </div>

      <div className="card">
        <h2>Live Input</h2>
        <input
          type="text"
          placeholder="Type your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>{name ? `Hello, ${name}!` : 'Start typing to see it update live.'}</p>
      </div>

      <footer>Built with React + Vite</footer>
    </div>
  )
}

export default App
