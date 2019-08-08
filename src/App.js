import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const App = () => {
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleClick = async api => {
    setLoading(true)
    const repsonse = await window.fetch(`/.netlify/functions/${api}`)
    const data = await repsonse.json()
    setMsg(data.msg)
    setLoading(false)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <p>{msg}</p>
        <button onClick={() => handleClick('hello')}>{loading ? 'Loading' : 'Click Me'}</button>
        <button onClick={() => handleClick('async-dadjoke')}>{loading ? 'Loading' : 'Click Me'}</button>
      </header>
    </div>
  )
}

export default App
